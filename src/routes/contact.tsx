import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ContactSection } from "@/components/site/ContactSection";
import { AppointmentSection } from "@/components/site/AppointmentSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VKRTAX TECH — Book a Consultation in Hyderabad" },
      { name: "description", content: "Get in touch with VKRTAX TECH PRIVATE LIMITED for GST, Income Tax, ROC compliance, audit and legal services. Book a consultation today." },
      { property: "og:title", content: "Contact VKRTAX TECH" },
      { property: "og:description", content: "Talk to a tax & legal consultant. We respond within 24 hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <Layout>
      <div className="border-b border-border py-14 text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/85">Book a consultation, upload documents securely or use our calculators.</p>
        </div>
      </div>
      <ContactSection />
      <AppointmentSection />
    </Layout>
  ),
});