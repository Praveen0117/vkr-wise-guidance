import { gstDueDates } from "@/lib/services-data";
import { CalendarClock } from "lucide-react";

export function GstDueDates() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-[color:var(--blue)]" />
        <h3 className="text-lg font-semibold text-[color:var(--navy)]">GST Due Date Updates</h3>
      </div>
      <ul className="mt-5 divide-y divide-border">
        {gstDueDates.map((d) => (
          <li key={d.form} className="flex items-start justify-between gap-3 py-3">
            <div>
              <div className="font-semibold text-[color:var(--navy)]">{d.form}</div>
              <div className="text-xs text-muted-foreground">{d.desc}</div>
            </div>
            <span className="rounded-full bg-[color:var(--gold)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--gold-deep)]">{d.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}