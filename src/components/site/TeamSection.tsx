import { SectionHeading } from "./SectionHeading";
import { GraduationCap } from "lucide-react";

const team = [
  { role: "Chartered Accountants", count: "5+" },
  { role: "Legal Advisors", count: "4+" },
  { role: "GST Practitioners", count: "6+" },
  { role: "Accountants", count: "8+" },
  { role: "Compliance Executives", count: "5+" },
  { role: "Documentation Team", count: "10+" },
];

export function TeamSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading center eyebrow="Leadership & Team" title="Meet the people behind VKRTAX TECH" />
      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="rounded-3xl p-8 text-white lg:col-span-1" style={{ background: "var(--gradient-hero)" }}>
          <div className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-[color:var(--navy-deep)]" style={{ background: "var(--gradient-gold)" }}>VK</div>
          <h3 className="mt-5 text-2xl font-bold">Vattikulla Krishna Rao</h3>
          <p className="text-sm text-[color:var(--gold)]">Founder & Managing Director</p>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs">
            <GraduationCap className="h-3.5 w-3.5" /> M.Com, LL.B, MBA
          </div>
          <p className="mt-4 text-sm text-white/85">
            Tax Consultant & Business Advisor with 15+ years of expertise in Taxation, GST, Legal Compliance and Business Advisory Services. Trusted by hundreds of businesses across Telangana and India.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-[color:var(--navy)]">A multi-disciplinary team you can rely on</h3>
          <p className="mt-2 text-sm text-muted-foreground">Our experts bring deep specialization across every area of tax, legal and corporate compliance.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {team.map((t) => (
              <div key={t.role} className="rounded-xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)]">
                <div className="text-3xl font-bold text-[color:var(--gold-deep)]">{t.count}</div>
                <div className="mt-1 text-sm font-medium text-[color:var(--navy)]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}