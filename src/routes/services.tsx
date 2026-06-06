import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { services } from "@/lib/services-data";
import { CheckCircle2 } from "lucide-react";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — GST, Income Tax, ROC, Trademark, Audit & Legal | VKRTAX TECH" },
      { name: "description", content: "Explore our full range of services: GST filing, ITR, Company Registration, ROC compliance, Trademark, Audit, NCLT, CA certifications, valuations and legal advisory." },
      { property: "og:title", content: "Our Services — VKRTAX TECH" },
      { property: "og:description", content: "GST, Income Tax, ROC, Trademark, Audit and Legal services under one roof." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: () => (
    <Layout>
      <div className="border-b border-border py-16 text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/80">From GST to NCLT — comprehensive tax, legal & compliance solutions tailored for businesses and individuals.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.slug} id={s.slug} className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:grid-cols-3 md:p-8">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl text-white" style={{ background: "var(--gradient-hero)" }}>
                  <Icon className="h-7 w-7 text-[color:var(--gold)]" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-[color:var(--navy)]">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 md:col-span-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--gold-deep)]" />{it}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ContactSection />
    </Layout>
  ),
});