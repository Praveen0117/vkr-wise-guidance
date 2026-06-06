import { Link } from "@tanstack/react-router";
import { services } from "@/lib/services-data";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What We Do" title="Comprehensive Tax, Legal & Compliance Services" subtitle="Fourteen specialized practice areas under one trusted roof." />
          <Link to="/services" className="text-sm font-semibold text-[color:var(--blue)] hover:underline">View all services →</Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} to="/services" className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-elegant)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--navy)] text-white transition-colors group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--navy-deep)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[color:var(--navy)]">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--blue)]">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}