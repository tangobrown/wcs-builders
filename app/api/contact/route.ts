import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // honeypot
};

/**
 * Contact form handler.
 *
 * Validates required fields (name + email) and a honeypot, then delivers the
 * message. Delivery uses Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are
 * set; otherwise it logs server-side and still returns 200 so the site is
 * demoable out of the box. Wire real credentials before launch — see README.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without doing anything.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Name and a valid email address are required." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "WCS Website <onboarding@resend.dev>";

  const text = [
    `New enquiry from the WCS website`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    ``,
    `Message:`,
    message || "—",
  ].join("\n");

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `Website enquiry from ${name}`,
          text,
        }),
      });
      if (!res.ok) {
        console.error("Resend delivery failed:", await res.text());
        return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
      }
    } catch (err) {
      console.error("Resend delivery error:", err);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
  } else {
    // No mailbox configured yet — log so the demo works end-to-end.
    console.info(
      "[contact] Email delivery not configured. Would send:\n" + text,
    );
  }

  return NextResponse.json({ ok: true });
}
