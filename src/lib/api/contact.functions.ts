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
    const recipient = process.env.CONTACT_EMAIL ?? "vkrtaxtech@gmail.com";

    if (!user || !pass) {
      throw new Error("Email service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
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
