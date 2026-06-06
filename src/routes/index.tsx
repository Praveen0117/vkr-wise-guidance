import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/AboutSection";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { AppointmentSection } from "@/components/site/AppointmentSection";
import { TeamSection } from "@/components/site/TeamSection";
import { Testimonials } from "@/components/site/Testimonials";
import { BlogPreview } from "@/components/site/BlogPreview";
import { FAQSection } from "@/components/site/FAQSection";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VKRTAX TECH PRIVATE LIMITED — Tax, GST, ROC & Legal Consultants in Hyderabad" },
      { name: "description", content: "Complete GST, Income Tax, ROC, Trademark, Audit & Legal Consultancy services for businesses and individuals. Trusted CA & Legal experts in Hyderabad, Telangana." },
      { property: "og:title", content: "VKRTAX TECH PRIVATE LIMITED — Tax & Legal Consultants" },
      { property: "og:description", content: "Complete ROC, GST, Income Tax & Legal Compliance Services Under One Roof." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "keywords", content: "GST Consultant Hyderabad, Income Tax Filing Services, Tax Consultant Telangana, GST Return Filing, Company Registration, ROC Compliance, ITR Filing Expert, Trademark Registration, Audit Firm Hyderabad, NCLT Legal Services" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <ServicesGrid limit={9} />
      <AppointmentSection />
      <TeamSection />
      <Testimonials />
      <BlogPreview />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
}
