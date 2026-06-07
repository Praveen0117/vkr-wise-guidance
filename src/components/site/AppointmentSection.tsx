import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TaxCalculator } from "./TaxCalculator";
import { SectionHeading } from "./SectionHeading";
import { services } from "@/lib/services-data";
import { sendAppointmentEmail, sendDocumentEmail } from "@/lib/api/contact.functions";

const WHATSAPP_NUMBER = "918500103363";
const MAX_FILE_SIZE_MB = 5;
const MAX_FILES = 5;

const TIME_SLOTS = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
];

const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(15),
  email: z.string().trim().email("Enter a valid email address").max(255),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please pick a date"),
  slot: z.string().min(1, "Please select a time slot"),
});

const docSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(15),
  email: z.string().trim().email("Enter a valid email address").max(255),
});

type AppointmentValues = z.infer<typeof appointmentSchema>;
type DocValues = z.infer<typeof docSchema>;

const selectClass =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
  });
}

export function AppointmentSection() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({ resolver: zodResolver(appointmentSchema) });

  const {
    register: registerDoc,
    handleSubmit: handleDocSubmit,
    formState: { errors: docErrors },
  } = useForm<DocValues>({ resolver: zodResolver(docSchema) });

  const onSubmitAppointment = async (values: AppointmentValues) => {
    try {
      await sendAppointmentEmail({ data: values });
      toast.success("Appointment request sent! We'll confirm within 24 hours.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Array.from(e.target.files ?? []);
    const oversized = raw.filter((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (oversized.length) {
      toast.error(`Each file must be under ${MAX_FILE_SIZE_MB} MB.`);
      e.target.value = "";
      return;
    }
    if (raw.length > MAX_FILES) {
      toast.error(`You can upload up to ${MAX_FILES} files at once.`);
      e.target.value = "";
      return;
    }
    setSelectedFiles(raw);
    if (raw.length) toast.info(`${raw.length} file(s) selected.`);
  };

  const onSendEmail = async (values: DocValues) => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file.");
      return;
    }
    setIsSendingEmail(true);
    try {
      const encoded = await Promise.all(
        selectedFiles.map(async (f) => ({
          name: f.name,
          type: f.type || "application/octet-stream",
          data: await toBase64(f),
        }))
      );
      await sendDocumentEmail({ data: { ...values, files: encoded } });
      toast.success("Documents sent via email! You'll receive a confirmation shortly.");
      setSelectedFiles([]);
    } catch {
      toast.error("Failed to send. Please try again or use WhatsApp.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const onSendWhatsApp = (values: DocValues) => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file.");
      return;
    }
    const fileNames = selectedFiles.map((f) => f.name).join(", ");
    const message = encodeURIComponent(
      `Hi VKRTAX, I'm ${values.name} (${values.phone}). I'd like to share the following document(s): ${fileNames}. Please confirm receipt.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
    toast.info("WhatsApp opened — please attach your files manually in the chat.");
  };

  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading center eyebrow="Tools & Booking" title="Plan, calculate and book — all in one place" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Appointment booking card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-semibold text-[color:var(--navy)]">Book an Appointment</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a slot and our consultant will get back to you within 24 hours.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmitAppointment)}>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="a-name">Name</Label>
                  <Input id="a-name" {...register("name")} maxLength={100} placeholder="Your full name" className="mt-1" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="a-phone">Phone</Label>
                  <Input id="a-phone" type="tel" {...register("phone")} maxLength={15} placeholder="+91 98765 43210" className="mt-1" />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Row 2: Email */}
                <div>
                  <Label htmlFor="a-email">Email</Label>
                  <Input id="a-email" type="email" {...register("email")} maxLength={255} placeholder="you@example.com" className="mt-1" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>

                {/* Row 3: Service */}
                <div>
                  <Label htmlFor="a-service">Service</Label>
                  <select id="a-service" {...register("service")} className={selectClass}>
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
                </div>
              </div>

              {/* Row 4: Date + Time Slot */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="a-date">Preferred Date</Label>
                  <Input id="a-date" type="date" {...register("date")} min={today} className="mt-1" />
                  {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date.message}</p>}
                </div>
                <div>
                  <Label htmlFor="a-slot">Time Slot</Label>
                  <select id="a-slot" {...register("slot")} className={selectClass}>
                    <option value="">Select a slot…</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.slot && <p className="mt-1 text-xs text-destructive">{errors.slot.message}</p>}
                </div>
              </div>

              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full"
                style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}
              >
                {isSubmitting ? "Sending…" : "Confirm Booking"}
              </Button>
            </form>
          </div>

          <TaxCalculator />
        </div>

        {/* Document Upload Card */}
        <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--gold)] bg-card p-6">
          <h3 className="text-lg font-semibold text-[color:var(--navy)]">Secure Client Document Upload</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Share PAN, Aadhaar, GST docs or invoices safely. Fill in your details, pick files, then send via email or WhatsApp.
          </p>

          <form className="mt-5 space-y-4">
            {/* Contact details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="d-name">Name</Label>
                <Input id="d-name" {...registerDoc("name")} maxLength={100} placeholder="Your full name" className="mt-1" />
                {docErrors.name && <p className="mt-1 text-xs text-destructive">{docErrors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="d-phone">Phone</Label>
                <Input id="d-phone" type="tel" {...registerDoc("phone")} maxLength={15} placeholder="+91 98765 43210" className="mt-1" />
                {docErrors.phone && <p className="mt-1 text-xs text-destructive">{docErrors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="d-email">Email</Label>
                <Input id="d-email" type="email" {...registerDoc("email")} maxLength={255} placeholder="you@example.com" className="mt-1" />
                {docErrors.email && <p className="mt-1 text-xs text-destructive">{docErrors.email.message}</p>}
              </div>
            </div>

            {/* File picker */}
            <div>
              <Label>Files <span className="text-muted-foreground font-normal">(up to {MAX_FILES} files, max {MAX_FILE_SIZE_MB} MB each)</span></Label>
              <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-md border border-border bg-secondary px-4 py-3 text-sm font-medium hover:bg-secondary/80 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                  : "Choose files to upload"}
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                disabled={isSendingEmail}
                className="flex-1"
                style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}
                onClick={handleDocSubmit(onSendEmail)}
              >
                {isSendingEmail ? "Sending…" : "Send via Email"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                onClick={handleDocSubmit(onSendWhatsApp)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
