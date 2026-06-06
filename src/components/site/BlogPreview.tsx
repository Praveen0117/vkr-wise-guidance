import { Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/services-data";
import { SectionHeading } from "./SectionHeading";
import { Calendar, ArrowUpRight } from "lucide-react";

export function BlogPreview({ limit = 3 }: { limit?: number }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading eyebrow="Insights & Updates" title="Latest from our Blog" subtitle="GST updates, ITR tips, ROC deadlines and legal advisory — straight from our experts." />
        <Link to="/blog" className="text-sm font-semibold text-[color:var(--blue)] hover:underline">All posts →</Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {blogPosts.slice(0, limit).map((p) => (
          <article key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <div className="h-40 w-full" style={{ background: "var(--gradient-hero)" }}>
              <div className="flex h-full items-center justify-center text-[color:var(--gold)]">
                <span className="text-xs font-semibold uppercase tracking-widest">{p.category}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {p.date}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-[color:var(--navy)] group-hover:text-[color:var(--blue)]">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--blue)]">Read article <ArrowUpRight className="h-4 w-4" /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}