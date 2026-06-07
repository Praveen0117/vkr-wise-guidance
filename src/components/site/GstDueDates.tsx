import { computeGstDueDates } from "@/lib/gst-dates";
import { fetchGstLiveData } from "@/lib/api/gst.functions";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, RefreshCw } from "lucide-react";

export function GstDueDates() {
  const fallback = computeGstDueDates();

  const { data: liveData, isFetching } = useQuery({
    queryKey: ["gst-live"],
    queryFn: () => fetchGstLiveData(),
    staleTime: 30 * 60 * 1000,
  });

  const dueDates = liveData?.dates ?? fallback;
  const notifications = liveData?.notifications ?? [];
  const lastChecked  = liveData?.lastChecked;
  const webSuccess   = liveData?.webSuccess ?? false;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-[color:var(--blue)]" />
          <h3 className="text-lg font-semibold text-[color:var(--navy)]">GST Due Date Updates</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {isFetching && <RefreshCw className="h-3 w-3 animate-spin" />}
          {lastChecked ? (
            <span title={webSuccess ? "Fetched from CBIC" : "Computed from schedule"}>
              {webSuccess ? "CBIC · " : ""}{lastChecked}
            </span>
          ) : (
            <span>Live dates</span>
          )}
        </div>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {dueDates.map((d) => (
          <li key={d.form} className="flex items-start justify-between gap-3 py-3">
            <div>
              <div className="font-semibold text-[color:var(--navy)]">{d.form}</div>
              <div className="text-xs text-muted-foreground">{d.desc}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: d.isUrgent
                    ? "rgba(239,68,68,0.12)"
                    : "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: d.isUrgent ? "rgb(220,38,38)" : "var(--gold-deep)",
                }}
              >
                {d.nextDueLabel}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {d.isOverdue
                  ? "Overdue"
                  : d.daysLeft === 0
                    ? "Due today"
                    : `${d.daysLeft} day${d.daysLeft === 1 ? "" : "s"} left`}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {notifications.length > 0 && (
        <div className="mt-4 rounded-xl border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5 p-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold-deep)]">
            CBIC Notifications
          </div>
          <ul className="space-y-1">
            {notifications.map((n, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-snug">· {n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}