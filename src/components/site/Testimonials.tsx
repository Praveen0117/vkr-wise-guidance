import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  { name: "Ramesh Kumar", role: "Founder, RK Traders", text: "VKRTAX handled our GST registration and monthly returns flawlessly. Their response time is unmatched." },
  { name: "Priya Sharma", role: "Director, Sharma Exports Pvt Ltd", text: "From IEC to ROC compliance, they manage everything. Truly a one-stop solution for our company." },
  { name: "Anil Reddy", role: "CEO, AR Foods", text: "Professional, transparent and affordable. Helped us with FSSAI, trademark and tax planning seamlessly." },
];

export function Testimonials() {
  return (
    <section className="bg-[color:var(--navy-deep)] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">Testimonials</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by businesses & individuals across India</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <Quote className="absolute right-5 top-5 h-8 w-8 text-[color:var(--gold)]/30" />
              <div className="flex gap-1 text-[color:var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm text-white/85">"{t.text}"</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-white/60">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}