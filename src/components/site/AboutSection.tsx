import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const whyUs = [
  "Experienced Tax & Legal Professionals",
  "Affordable Consultancy",
  "Timely Filing & Compliance",
  "Dedicated Client Support",
  "Online & Offline Services",
  "Trusted by Businesses & Individuals",
];

export function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="About Us" title="A trusted name in Tax, Legal & Compliance consultancy"
            subtitle="VKRTAX TECH PRIVATE LIMITED delivers end-to-end professional services — from GST and Income Tax to ROC, audit and corporate legal support — backed by a team of qualified Chartered Accountants and Legal Advisors." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <Target className="h-6 w-6 text-[color:var(--blue)]" />
              <h3 className="mt-3 font-semibold text-[color:var(--navy)]">Our Mission</h3>
              <p className="mt-1 text-sm text-muted-foreground">Empower every business and individual with accurate, timely and affordable tax & legal compliance.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <Eye className="h-6 w-6 text-[color:var(--blue)]" />
              <h3 className="mt-3 font-semibold text-[color:var(--navy)]">Our Vision</h3>
              <p className="mt-1 text-sm text-muted-foreground">To be India's most trusted single-window consultancy for tax, legal and corporate services.</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--gradient-gold)" }}>
              <Award className="h-5 w-5 text-[color:var(--navy-deep)]" />
            </div>
            <h3 className="text-xl font-bold text-[color:var(--navy)]">Why Choose Us</h3>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whyUs.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold-deep)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}