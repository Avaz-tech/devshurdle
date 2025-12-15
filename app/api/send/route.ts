import { EmailTemplate } from "../../../components/EmailTemplate";
import { Resend } from "resend";
import { validateContactForm, sanitizeContactForm } from "../../../lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[API] Contact form received:", { name: body.name, email: body.email });

    const { name, email, subject, message } = body;

    // Validate form data
    const validation = validateContactForm({ name, email, subject, message });
    if (!validation.valid) {
      return Response.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Check environment variable
    if (!process.env.RESEND_API_KEY) {
      console.error("[API] Missing RESEND_API_KEY env variable");
      return Response.json(
        { error: "Server configuration error: Email service not configured" },
        { status: 500 }
      );
    }

    // Sanitize inputs
    const sanitized = sanitizeContactForm({ name, email, subject, message });

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "DevsHurdle <onboarding@resend.dev>",
      to: ["avazravshan0@gmail.com"],
      subject: `New Contact: ${sanitized.subject}`,
      react: EmailTemplate({
        name: sanitized.name,
        email: sanitized.email,
        message: sanitized.message,
      }),
    });

    if (error) {
      console.error("[API] Resend error:", error);
      return Response.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    console.log("[API] Email sent successfully:", data?.id);
    return Response.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("[API] Unexpected error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
