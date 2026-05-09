import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER || "support.webzen.tech@gmail.com",
      subject: `WebZen Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
            <h2 style="color: #00d2ff; border-bottom: 2px solid #00d2ff; padding-bottom: 10px;">New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 10px; color: #999; margin-top: 20px;">Sent via WebZen Portfolio Contact Form</p>
          </div>
        </div>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
