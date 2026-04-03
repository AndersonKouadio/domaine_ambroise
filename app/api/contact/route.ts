import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, telephone, email, espace, date, personnes, message } = body;

    if (!nom || !telephone || !espace) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f4c3a; padding: 24px; text-align: center;">
          <h1 style="color: #dda228; margin: 0; font-size: 20px;">Nouvelle demande de réservation</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">Domaine Ambroise</p>
        </div>
        <div style="padding: 24px; background: #f5f3eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666; width: 140px;">Nom</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; font-weight: bold; color: #1a1a1a;">${nom}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666;">Téléphone</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; font-weight: bold; color: #1a1a1a;">${telephone}</td></tr>
            ${email ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #1a1a1a;">${email}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666;">Espace</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; font-weight: bold; color: #dda228;">${espace}</td></tr>
            ${date ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666;">Date</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #1a1a1a;">${date}</td></tr>` : ""}
            ${personnes ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #666;">Personnes</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ddd5; color: #1a1a1a;">${personnes}</td></tr>` : ""}
          </table>
          ${message ? `<div style="margin-top: 16px; padding: 16px; background: white; border-left: 3px solid #dda228;"><p style="margin: 0 0 4px; color: #666; font-size: 12px;">Message</p><p style="margin: 0; color: #1a1a1a;">${message}</p></div>` : ""}
        </div>
        <div style="background: #0a3328; padding: 16px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 11px;">Domaine Ambroise · Tiassalé · Côte d'Ivoire</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Domaine Ambroise <noreply@domaineambroise.com>",
      to: "contact@domaineambroise.com",
      subject: `Nouvelle réservation – ${nom} – ${espace}`,
      html: htmlContent,
      replyTo: email || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
