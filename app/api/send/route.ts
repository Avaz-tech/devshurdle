import { EmailTemplate } from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { name, email, subject, message } = body;

    // Debug log for serverless logs
    if (!name || !email || !subject || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Missing RESEND_API_KEY env variable" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "DevsHurdle <onboarding@resend.dev>",
      to: ["avazravshan0@gmail.com"],
      subject: `${subject}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("API /api/send error:", error);
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
