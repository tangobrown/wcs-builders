"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "sent" | "error";
type Errors = { name?: string; email?: string };

const MAX = 180;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full bg-field border border-field-border px-[14px] py-[13px] text-[18px] text-navy " +
  "placeholder:text-muted aria-[invalid=true]:border-gold";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  if (status === "sent") {
    return (
      <div className="border-l-[3px] border-gold bg-mist p-7" role="status">
        <h3 className="mb-[10px] font-heading text-[21px] font-bold text-navy">
          Thanks &ndash; message sent
        </h3>
        <p className="text-[18px] leading-[1.8] text-body">
          We&rsquo;ll get back to you as soon as we can, usually within one
          working day.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email))
      nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    // Honeypot — real users leave this hidden field empty. If it's filled,
    // silently show success without sending anything.
    if (String(data.get("company") ?? "") !== "") {
      setStatus("sent");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(data.get("phone") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          company: String(data.get("company") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[560px] flex-col gap-5">
      {/* Honeypot: visually hidden, ignored by real users. The server drops
          any submission where this field is filled. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[14px] font-bold tracking-[0.02em] text-navy">
          Name <span className="text-gold">*</span>
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "err-name" : undefined}
          className={fieldClass}
        />
        {errors.name && (
          <span id="err-name" className="mt-2 block text-[14px] text-gold-deep">
            {errors.name}
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-[14px] font-bold tracking-[0.02em] text-navy">
          Email Address <span className="text-gold">*</span>
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "err-email" : undefined}
          className={fieldClass}
        />
        {errors.email && (
          <span id="err-email" className="mt-2 block text-[14px] text-gold-deep">
            {errors.email}
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-[14px] font-bold tracking-[0.02em] text-navy">
          Phone Number
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[14px] font-bold tracking-[0.02em] text-navy">
          What can we do for you?
        </span>
        <textarea
          name="message"
          rows={6}
          maxLength={MAX}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setCount(e.target.value.length);
          }}
          className={`${fieldClass} resize-y`}
        />
        <span className="mt-[6px] block text-right text-[14px] text-muted">
          {count} / {MAX}
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-[15px] text-gold-deep">
          Sorry, something went wrong sending your message. Please try again, or
          call us on 07739&nbsp;084929.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="min-h-[44px] cursor-pointer self-start border-0 bg-gold px-[30px] py-4 font-heading text-[16.5px] font-bold text-white transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
