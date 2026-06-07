import { createServerFn } from "@tanstack/react-start";
import { computeGstDueDates, type GstDueDate } from "@/lib/gst-dates";
import { format } from "date-fns";

export interface NewsItem {
  id: string;
  title: string;
  date: string;       // e.g. "29 May 2026"
  rawDate: string;    // e.g. "29-May-2026" for sorting
  source: "Income Tax" | "CBIC / GST";
}

export interface GstLiveData {
  dates: GstDueDate[];
  newsItems: NewsItem[];
  notifications: string[];
  lastChecked: string;
  webSuccess: boolean;
}

// ── In-memory cache (6-hour TTL) ─────────────────────────────────────────────
let _cache: GstLiveData | null = null;
let _cacheExpiresAt = 0;
const TTL_MS = 6 * 60 * 60 * 1000;

const FETCH_OPTS = {
  signal: AbortSignal.timeout(6000),
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    Accept: "text/html,application/xhtml+xml",
  },
};

// ── Parsers ───────────────────────────────────────────────────────────────────

const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function formatRawDate(raw: string): string {
  // "29-May-2026" → "29 May 2026"
  return raw.replace(/-/g, " ");
}

function parseIncometaxNews(html: string): NewsItem[] {
  // Strip scripts, styles, and nav blocks to reduce noise
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

  const items: NewsItem[] = [];
  const seen = new Set<string>();

  // Match <li>…</li> blocks that contain a date in (DD-Mon-YYYY) format
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  const dateRegex = /\((\d{2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4})\)/i;

  let match: RegExpExecArray | null;
  while ((match = liRegex.exec(clean)) !== null) {
    const raw = match[1];
    const dateMatch = dateRegex.exec(raw);
    if (!dateMatch) continue;

    const rawDate = dateMatch[1]; // "29-May-2026"
    // Strip HTML tags and the date itself to get the title
    const title = raw
      .replace(/<[^>]+>/g, " ")
      .replace(dateMatch[0], "")
      .replace(/\s+/g, " ")
      .trim();

    if (title.length < 20 || seen.has(title)) continue;
    seen.add(title);

    items.push({
      id: `it-${rawDate}-${items.length}`,
      title,
      date: formatRawDate(rawDate),
      rawDate,
      source: "Income Tax",
    });

    if (items.length >= 10) break;
  }

  return items;
}

function parseCbicNews(html: string): NewsItem[] {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&");

  const items: NewsItem[] = [];
  const seen = new Set<string>();

  // CBIC often lists items with headings + date text
  const dateRegex = /(\d{2}[/-](?:\d{2}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[/-]\d{4})/i;
  const liRegex = /<(?:li|p|div)[^>]*>([\s\S]*?)<\/(?:li|p|div)>/gi;

  let match: RegExpExecArray | null;
  while ((match = liRegex.exec(clean)) !== null) {
    const raw = match[1];
    const dateMatch = dateRegex.exec(raw);
    if (!dateMatch) continue;

    const text = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length < 20 || seen.has(text)) continue;
    if (!/GSTR|GST|circular|notification|return|due date|extended/i.test(text)) continue;

    seen.add(text);
    const d = dateMatch[1].replace(/\//g, "-");

    items.push({
      id: `cbic-${d}-${items.length}`,
      title: text.replace(dateMatch[0], "").replace(/[()]/g, "").trim(),
      date: d,
      rawDate: d,
      source: "CBIC / GST",
    });

    if (items.length >= 5) break;
  }

  return items;
}

function extractNotifications(html: string): string[] {
  const stripped = html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ");
  return stripped
    .split(/[.;|]/)
    .map((s) => s.trim())
    .filter(
      (s) =>
        s.length > 30 &&
        s.length < 220 &&
        /due date|extended|GSTR|last date|deadline|circular|notification/i.test(s)
    )
    .slice(0, 4);
}

// ── Server function ───────────────────────────────────────────────────────────

export const fetchGstLiveData = createServerFn({ method: "GET" }).handler(
  async (): Promise<GstLiveData> => {
    const now = Date.now();

    if (_cache && now < _cacheExpiresAt) {
      return _cache;
    }

    const dates = computeGstDueDates();
    let newsItems: NewsItem[] = [];
    let notifications: string[] = [];
    let webSuccess = false;

    // Fetch both sources in parallel, each with independent error handling
    const [itResult, cbicResult] = await Promise.allSettled([
      fetch("https://www.incometax.gov.in/iec/foportal/latest-news", FETCH_OPTS),
      fetch("https://cbic-gst.gov.in/", FETCH_OPTS),
    ]);

    if (itResult.status === "fulfilled" && itResult.value.ok) {
      try {
        const html = await itResult.value.text();
        const parsed = parseIncometaxNews(html);
        newsItems.push(...parsed);
        if (parsed.length > 0) webSuccess = true;
      } catch { /* silent */ }
    }

    if (cbicResult.status === "fulfilled" && cbicResult.value.ok) {
      try {
        const html = await cbicResult.value.text();
        const parsed = parseCbicNews(html);
        newsItems.push(...parsed);
        notifications = extractNotifications(html);
        if (parsed.length > 0) webSuccess = true;
      } catch { /* silent */ }
    }

    _cache = {
      dates,
      newsItems,
      notifications,
      lastChecked: format(new Date(now), "d MMM yyyy, h:mm a"),
      webSuccess,
    };
    _cacheExpiresAt = now + TTL_MS;

    return _cache;
  }
);
