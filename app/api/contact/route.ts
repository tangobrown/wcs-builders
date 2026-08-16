import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
 * Validates required fields (name + email) and a honeypot, then sends the
 * enquiry via Postmark's transactional email API. Delivery is active when
 * POSTMARK_SERVER_TOKEN, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are set;
 * otherwise it logs the message server-side and still returns 200 so the site
 * is demoable out of the box. Wire the real values before launch — see README.
 *
 * The Postmark server token is secret and must only ever live server-side,
 * which is why this runs as a route handler rather than posting from the
 * browser.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending anything.
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

  const token = process.env.POSTMARK_SERVER_TOKEN;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const messageStream = process.env.POSTMARK_MESSAGE_STREAM ?? "outbound";

  const textBody = [
    "New enquiry from the WCS website",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  if (token && to && from) {
    try {
      const res = await fetch("https://api.postmarkapp.com/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": token,
        },
        body: JSON.stringify({
          From: from,
          To: to,
          ReplyTo: email,
          Subject: `Website enquiry from ${name}`,
          TextBody: textBody,
          MessageStream: messageStream,
        }),
      });

      // Postmark returns HTTP 200 with ErrorCode 0 on success; validation
      // problems come back as non-2xx with an ErrorCode/Message.
      if (!res.ok) {
        console.error("Postmark delivery failed:", await res.text());
        return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
      }
    } catch (err) {
      console.error("Postmark delivery error:", err);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
  } else {
    // Not configured yet — log so the demo works end-to-end.
    console.info("[contact] Email delivery not configured. Would send:\n" + textBody);
  }

  return NextResponse.json({ ok: true });
}
