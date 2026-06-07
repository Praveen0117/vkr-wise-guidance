import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { computeAllImportantDates, type ImportantDate } from "@/lib/gst-dates";
import { useQuery } from "@tanstack/react-query";
import { fetchGstLiveData, type NewsItem } from "@/lib/api/gst.functions";
import { useState } from "react";

// ── helpers ─────────────────────────────────────────────────────────────────

function categoryStyle(cat: ImportantDate["category"]) {
  return cat === "GST"
    ? { bg: "rgba(240,192,64,0.18)", color: "var(--gold)" }
    : { bg: "rgba(120,180,255,0.18)", color: "#7bc6ff" };
}

function sourceStyle(src: NewsItem["source"]) {
  return src === "Income Tax"
    ? { bg: "rgba(120,180,255,0.18)", color: "#7bc6ff" }
    : { bg: "rgba(240,192,64,0.18)", color: "var(--gold)" };
}

// ── sub-components ───────────────────────────────────────────────────────────

function DateRow({ d }: { d: ImportantDate }) {
  const cs = categoryStyle(d.category);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        style={{ background: cs.bg, color: cs.color }}
      >
        {d.category}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold text-white">{d.title}</div>
        <div className="text-[10px] text-white/50">{d.dueDateLabel}</div>
      </div>
      <span
        className={`whitespace-nowrap text-xs font-bold ${
          d.isUrgent ? "text-red-400" : "text-white/60"
        }`}
      >
        {d.daysLeft === 0 ? "Today" : `${d.daysLeft}d`}
        {d.isUrgent && " ⚠"}
      </span>
    </div>
  );
}

function NewsRow({ n }: { n: NewsItem }) {
  const ss = sourceStyle(n.source);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <div className="mb-1 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{ background: ss.bg, color: ss.color }}
        >
          {n.source}
        </span>
        <span className="text-[10px] text-white/40">{n.date}</span>
      </div>
      <div className="line-clamp-2 text-[11px] leading-snug text-white/80">{n.title}</div>
    </div>
  );
}

function DateCard({ d }: { d: ImportantDate }) {
  const cs = categoryStyle(d.category);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: cs.bg, color: cs.color }}
            >
              {d.category}
            </span>
            {d.isUrgent && (
              <span className="text-[10px] font-bold text-red-400">URGENT ⚠</span>
            )}
          </div>
          <div className="text-sm font-bold text-white">{d.title}</div>
          <div className="mt-0.5 text-xs text-white/60">{d.subtitle}</div>
          <div className="mt-1.5 text-base font-bold" style={{ color: "var(--gold)" }}>
            {d.dueDateLabel}
          </div>
        </div>
        <div
          className={`text-xl font-bold tabular-nums ${
            d.isUrgent ? "text-red-400" : "text-white/40"
          }`}
        >
          {d.daysLeft === 0 ? "Today" : `${d.daysLeft}d`}
        </div>
      </div>
      <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
        {(["Who", "Penalty", "Note"] as const).map((label, i) => (
          <li key={label} className="flex gap-2 text-[11px] leading-snug">
            <span className="w-12 shrink-0 font-semibold text-white/40">{label}</span>
            <span className="text-white/70">{d.details[i]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsCard({ n }: { n: NewsItem }) {
  const ss = sourceStyle(n.source);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{ background: ss.bg, color: ss.color }}
        >
          {n.source}
        </span>
        <span className="text-[10px] text-white/40">{n.date}</span>
      </div>
      <div className="text-sm leading-relaxed text-white/90">{n.title}</div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function Hero() {
  const importantDates = computeAllImportantDates();

  const { data: liveData } = useQuery({
    queryKey: ["gst-live"],
    queryFn: () => fetchGstLiveData(),
    staleTime: 30 * 60 * 1000,
  });

  const newsItems  = liveData?.newsItems  ?? [];
  const lastChecked = liveData?.lastChecked ?? null;
  const webSuccess  = liveData?.webSuccess  ?? false;

  const [showAll, setShowAll]       = useState(false);
  const [activeTab, setActiveTab]   = useState<"dates" | "news">("dates");

  const topDates = importantDates.slice(0, 3);
  const topNews  = newsItems.slice(0, 2);

  return (
    <section
      className="-mt-16 relative overflow-hidden text-white"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,215,128,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(120,180,255,0.35), transparent 45%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        {/* ── Left column ──────────────────────────────────────────────── */}
        <div className="relative animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Trusted Tax, Legal & Compliance Partner
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Complete{" "}
            <span className="text-[color:var(--gold)]">Tax & Legal</span>{" "}
            Solutions with Trusted Guidance
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Complete ROC, GST, Income Tax & Legal Compliance Services Under One
            Roof — expert consultancy for businesses and individuals across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}
            >
              <Link to="/contact">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/contact">
                <Phone className="h-4 w-4" /> Contact Us
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#1ebe57]"
            >
              <a
                href="https://wa.me/918500103363"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Chat
              </a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
            {[
              ["15+", "Years Experience"],
              ["2,500+", "Happy Clients"],
              ["50+", "Service Areas"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-[color:var(--gold)] sm:text-3xl">{n}</div>
                <div className="text-xs uppercase tracking-wider text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
          <div className="relative rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--gold)]">
                <ShieldCheck className="h-4 w-4" /> Compliance Snapshot
              </div>
              <span className="flex items-center gap-1 text-[10px] text-white/40">
                <span
                  className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                    webSuccess ? "bg-emerald-400" : "bg-white/30"
                  }`}
                />
                {lastChecked
                  ? webSuccess
                    ? `Live · ${lastChecked}`
                    : `Computed · ${lastChecked}`
                  : "Fetching updates…"}
              </span>
            </div>

            {/* Status badges */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { k: "GST Filing", v: "On Time",   c: "var(--gold)" },
                { k: "ROC Filing", v: "Active",     c: "#7be3a5" },
                { k: "ITR Status", v: "Filed",      c: "#7bc6ff" },
                { k: "Audit",      v: "Scheduled",  c: "var(--gold)" },
              ].map((i) => (
                <div key={i.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/70">{i.k}</div>
                  <div className="mt-1 text-lg font-semibold" style={{ color: i.c }}>
                    {i.v}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Important Dates ─────────────────────────────────────── */}
            <div className="mt-5">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                <Calendar className="h-3 w-3" /> Important Dates
              </div>
              <div className="space-y-2">
                {topDates.map((d) => (
                  <DateRow key={d.id} d={d} />
                ))}
              </div>
            </div>

            {/* ── News & Updates ──────────────────────────────────────── */}
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                <Newspaper className="h-3 w-3" /> Latest Updates
              </div>
              {topNews.length > 0 ? (
                <div className="space-y-2">
                  {topNews.map((n) => (
                    <NewsRow key={n.id} n={n} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-[11px] text-white/40">
                  Fetching live updates…
                </div>
              )}
            </div>

            {/* ── View All button ─────────────────────────────────────── */}
            <button
              onClick={() => { setActiveTab("dates"); setShowAll(true); }}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              View All News & Updates <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── View All Dialog ───────────────────────────────────────────────── */}
      <Dialog open={showAll} onOpenChange={setShowAll}>
        <DialogContent
          className="max-h-[85vh] max-w-2xl overflow-hidden p-0"
          style={{
            background: "var(--navy-deep, #0f172a)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "white",
          }}
        >
          <DialogHeader className="border-b border-white/10 px-6 py-4">
            <DialogTitle className="text-base font-bold text-white">
              News & Important Dates
            </DialogTitle>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10 px-6 py-3">
            {(["dates", "news"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
                style={
                  activeTab === tab
                    ? { background: "var(--gradient-gold, #f0c040)", color: "var(--navy-deep, #0f172a)" }
                    : { border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }
                }
              >
                {tab === "dates"
                  ? `Important Dates (${importantDates.length})`
                  : `News & Updates (${newsItems.length})`}
              </button>
            ))}
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(85vh - 130px)" }}>
            {activeTab === "dates" && (
              <div className="space-y-3">
                {importantDates.map((d) => (
                  <DateCard key={d.id} d={d} />
                ))}
              </div>
            )}

            {activeTab === "news" && (
              <div className="space-y-3">
                {newsItems.length === 0 ? (
                  <div className="py-10 text-center text-sm text-white/40">
                    No live news available right now. Check back later.
                  </div>
                ) : (
                  newsItems.map((n) => <NewsCard key={n.id} n={n} />)
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}