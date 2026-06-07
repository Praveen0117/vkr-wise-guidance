import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(15),
  email: z.string().trim().email().max(255),
  service: z.string().min(1),
  message: z.string().trim().min(5).max(1000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const nodemailer = await import("nodemailer");

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL;

    if (!user || !pass) {
      throw new Error("Email service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await transporter.sendMail({
      from: `"VKR Tax Tech Website" <${user}>`,
      to: recipient,
      replyTo: data.email,
      subject: `Contact Form: ${data.service} enquiry from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1a2e5a; padding: 24px;">
            <h2 style="color: #f0c040; margin: 0;">New Contact Form Enquiry</h2>
            <p style="color: #ccd6f6; margin: 4px 0 0;">VKR Tax Tech — vkrtaxtech.in</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555; width: 120px;">Name</td>
                <td style="padding: 10px 8px; color: #222;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Phone</td>
                <td style="padding: 10px 8px; color: #222;">${data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 8px;"><a href="mailto:${data.email}" style="color: #1a2e5a;">${data.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Service</td>
                <td style="padding: 10px 8px; color: #222;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                <td style="padding: 10px 8px; color: #222; white-space: pre-wrap;">${data.message}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Reply directly to this email to respond to ${data.name}.
          </div>
        </div>
      `,
    });

    return { success: true };
  });

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(15),
  email: z.string().trim().email().max(255),
  service: z.string().min(1),
  date: z.string().min(1),
  slot: z.string().min(1),
});

export const sendAppointmentEmail = createServerFn({ method: "POST" })
  .inputValidator(appointmentSchema)
  .handler(async ({ data }) => {
    const nodemailer = await import("nodemailer");

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL;

    if (!user || !pass) {
      throw new Error("Email service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    // Notify the VKR team
    await transporter.sendMail({
      from: `"VKR Tax Tech Website" <${user}>`,
      to: recipient,
      replyTo: data.email,
      subject: `New Appointment: ${data.service} — ${data.name} on ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1a2e5a; padding: 24px;">
            <h2 style="color: #f0c040; margin: 0;">New Appointment Booking</h2>
            <p style="color: #ccd6f6; margin: 4px 0 0;">VKR Tax Tech — vkrtaxtech.in</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555; width: 130px;">Name</td>
                <td style="padding: 10px 8px; color: #222;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Phone</td>
                <td style="padding: 10px 8px; color: #222;">${data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 8px;"><a href="mailto:${data.email}" style="color: #1a2e5a;">${data.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Service</td>
                <td style="padding: 10px 8px; color: #222;">${data.service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Date</td>
                <td style="padding: 10px 8px; color: #222;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Time Slot</td>
                <td style="padding: 10px 8px; color: #222;">${data.slot}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Reply directly to this email to confirm or reschedule with ${data.name}.
          </div>
        </div>
      `,
    });

    // Send appointment confirmation to the client
    await transporter.sendMail({
      from: `"VKR Tax Tech" <${user}>`,
      to: data.email,
      subject: `Appointment Request Received — ${formattedDate}, ${data.slot}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1a2e5a; padding: 24px;">
            <h2 style="color: #f0c040; margin: 0;">Appointment Request Received</h2>
            <p style="color: #ccd6f6; margin: 4px 0 0;">VKR Tax Tech — vkrtaxtech.in</p>
          </div>
          <div style="padding: 24px;">
            <p style="color: #222; margin: 0 0 16px;">Dear ${data.name},</p>
            <p style="color: #444; margin: 0 0 16px;">Thank you for booking an appointment with us. Here are your details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555; width: 130px;">Service</td>
                <td style="padding: 10px 8px; color: #222;">${data.service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Date</td>
                <td style="padding: 10px 8px; color: #222;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Time Slot</td>
                <td style="padding: 10px 8px; color: #222;">${data.slot}</td>
              </tr>
            </table>
            <p style="color: #444; margin: 0;">Our consultant will get back to you within <strong>24 hours</strong> to confirm. For urgent matters, call us at <a href="tel:+919573266499" style="color: #1a2e5a;">+91 95732 66499</a>.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            VKR Tax Tech &bull; vkrtaxtech.in
          </div>
        </div>
      `,
    });

    return { success: true };
  });

const documentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(15),
  email: z.string().trim().email().max(255),
  files: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        data: z.string(), // base64-encoded file content
      })
    )
    .min(1)
    .max(5),
});

export const sendDocumentEmail = createServerFn({ method: "POST" })
  .inputValidator(documentSchema)
  .handler(async ({ data }) => {
    const nodemailer = await import("nodemailer");

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL;

    if (!user || !pass) {
      throw new Error("Email service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const fileList = data.files.map((f) => `<li>${f.name}</li>`).join("");
    const attachments = data.files.map((f) => ({
      filename: f.name,
      content: f.data,
      encoding: "base64" as const,
      contentType: f.type,
    }));

    // Notify the VKR team with attachments
    await transporter.sendMail({
      from: `"VKR Tax Tech Website" <${user}>`,
      to: recipient,
      replyTo: data.email,
      subject: `Document Upload from ${data.name} (${data.phone})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1a2e5a; padding: 24px;">
            <h2 style="color: #f0c040; margin: 0;">Client Document Upload</h2>
            <p style="color: #ccd6f6; margin: 4px 0 0;">VKR Tax Tech — vkrtaxtech.in</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555; width: 120px;">Name</td>
                <td style="padding: 10px 8px; color: #222;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Phone</td>
                <td style="padding: 10px 8px; color: #222;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 8px;"><a href="mailto:${data.email}" style="color: #1a2e5a;">${data.email}</a></td>
              </tr>
            </table>
            <p style="color: #555; font-weight: bold; margin: 0 0 8px;">Files attached (${data.files.length}):</p>
            <ul style="margin: 0; padding-left: 20px; color: #222;">${fileList}</ul>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Reply directly to this email to respond to ${data.name}.
          </div>
        </div>
      `,
      attachments,
    });

    // Send confirmation to the client
    await transporter.sendMail({
      from: `"VKR Tax Tech" <${user}>`,
      to: data.email,
      subject: `Documents Received — VKR Tax Tech`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1a2e5a; padding: 24px;">
            <h2 style="color: #f0c040; margin: 0;">Documents Received</h2>
            <p style="color: #ccd6f6; margin: 4px 0 0;">VKR Tax Tech — vkrtaxtech.in</p>
          </div>
          <div style="padding: 24px;">
            <p style="color: #222; margin: 0 0 16px;">Dear ${data.name},</p>
            <p style="color: #444; margin: 0 0 16px;">We have received the following document(s) from you:</p>
            <ul style="margin: 0 0 16px; padding-left: 20px; color: #222;">${fileList}</ul>
            <p style="color: #444; margin: 0;">Our team will review them and get back to you shortly. For urgent matters, call us at <a href="tel:+919573266499" style="color: #1a2e5a;">+91 95732 66499</a>.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            VKR Tax Tech &bull; vkrtaxtech.in
          </div>
        </div>
      `,
    });

    return { success: true };
  });
