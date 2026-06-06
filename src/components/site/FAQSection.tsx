import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  { q: "Do you provide services online across India?", a: "Yes. We serve clients pan-India through secure online consultations, document upload and digital signing." },
  { q: "How quickly can I register a company?", a: "A Private Limited or LLP can typically be registered within 7–10 working days, subject to MCA approval." },
  { q: "Can you handle GST and Income Tax notices?", a: "Absolutely. Our experts draft accurate replies for ASMT-10, DRC-01, ITR scrutiny and other notices." },
  { q: "What documents do I need for ITR filing?", a: "PAN, Aadhaar, Form 16, bank statements, investment proofs and any capital gains statements." },
  { q: "Is my data safe with VKRTAX TECH?", a: "Yes. We use encrypted document storage and never share client data without consent." },
];

export function FAQSection() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading center eyebrow="FAQ" title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card px-6 shadow-[var(--shadow-card)]">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left text-[color:var(--navy)]">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}