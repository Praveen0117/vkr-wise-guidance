import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { AboutSection } from "@/components/site/AboutSection";
import { TeamSection } from "@/components/site/TeamSection";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VKRTAX TECH — Tax, Legal & Compliance Consultants" },
      { name: "description", content: "Learn about VKRTAX TECH PRIVATE LIMITED — our mission, vision, leadership and team of CAs and Legal Advisors serving clients across India." },
      { property: "og:title", content: "About VKRTAX TECH PRIVATE LIMITED" },
      { property: "og:description", content: "Trusted tax, legal & compliance consultancy led by experienced professionals." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <Layout>
      <div className="border-b border-border bg-secondary/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-[color:var(--navy)]">About Us</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">A trusted name in Tax, GST, ROC and Legal consultancy — built on expertise, integrity and client-first service.</p>
        </div>
      </div>
      <AboutSection />
      <TeamSection />
      <Testimonials />
    </Layout>
  ),
});