import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { toast } from "sonner";
import { services } from "@/lib/services-data";
import { SectionHeading } from "./SectionHeading";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(15),
  email: z.string().trim().email().max(255),
  service: z.string().min(1),
  message: z.string().trim().min(5).max(1000),
});

export function ContactSection() {
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"),
      service, message: fd.get("message"),
    });
    if (!parsed.success) { toast.error("Please complete all fields correctly."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Thanks! Our team will reach out within 24 hours."); (e.target as HTMLFormElement).reset(); setService(""); }, 700);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading center eyebrow="Get in Touch" title="Talk to a Tax & Legal Consultant" subtitle="Our team responds within 24 hours. For urgent help, message us on WhatsApp." />
      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { Icon: MapPin, title: "Office Address", value: "Flat No.301, Sai Asitha Kasturi Residency, H.No.176/C, Vengalrao Nagar, S.R. Nagar, Hyderabad - 500038" },
            { Icon: Phone, title: "Mobile", value: "+91 85001 03363, +91 86888 41152" },
            { Icon: Mail, title: "Email", value: "vkrtaxtech@gmail.com" },
            { Icon: Globe, title: "Website", value: "www.vkrtaxtech.in" },
          ].map(({ Icon, title, value }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--navy)] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
                <div className="font-semibold text-[color:var(--navy)]">{value}</div>
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-xl border border-border shadow-[var(--shadow-card)]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Flat+No.301,+Sai+Asitha+Kasturi+Residency,+H.No.176/C,+Vengalrao+Nagar,+S.R.+Nagar,+Hyderabad+-+500038&output=embed"
              className="h-64 w-full" loading="lazy"
            />
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" required maxLength={15} /></div>
          </div>
          <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={255} /></div>
          <div>
            <Label>Service Required</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {services.map((s) => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required maxLength={1000} rows={5} /></div>
          <Button disabled={loading} type="submit" size="lg" className="w-full" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}