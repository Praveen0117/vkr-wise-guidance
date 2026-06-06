import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TaxCalculator } from "./TaxCalculator";
import { GstDueDates } from "./GstDueDates";
import { SectionHeading } from "./SectionHeading";

export function AppointmentSection() {
  const [submitting, setSubmitting] = useState(false);
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading center eyebrow="Tools & Booking" title="Plan, calculate and book — all in one place" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-1">
            <h3 className="text-lg font-semibold text-[color:var(--navy)]">Book an Appointment</h3>
            <p className="mt-1 text-sm text-muted-foreground">Pick a slot and our consultant will get back to you within 24 hours.</p>
            <form className="mt-5 space-y-3" onSubmit={(e) => {
              e.preventDefault(); setSubmitting(true);
              setTimeout(() => { setSubmitting(false); toast.success("Appointment request received. We'll call you soon!"); (e.target as HTMLFormElement).reset(); }, 700);
            }}>
              <div><Label htmlFor="a-name">Name</Label><Input id="a-name" required maxLength={100} /></div>
              <div><Label htmlFor="a-phone">Phone</Label><Input id="a-phone" required type="tel" maxLength={15} /></div>
              <div><Label htmlFor="a-date">Preferred Date</Label><Input id="a-date" required type="date" /></div>
              <Button disabled={submitting} type="submit" className="w-full" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </div>
          <TaxCalculator />
          <GstDueDates />
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--gold)] bg-card p-6 text-center">
          <h3 className="text-lg font-semibold text-[color:var(--navy)]">Secure Client Document Upload</h3>
          <p className="mt-1 text-sm text-muted-foreground">Share PAN, Aadhaar, GST docs or invoices safely with our team.</p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80">
            <input type="file" multiple className="hidden" onChange={(e) => {
              const n = e.target.files?.length ?? 0;
              if (n) toast.success(`${n} file(s) ready. Submit via WhatsApp for fastest response.`);
            }} />
            Choose files to upload
          </label>
        </div>
      </div>
    </section>
  );
}