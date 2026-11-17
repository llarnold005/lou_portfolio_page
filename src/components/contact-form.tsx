"use client";
import { useState } from "react";
import { inquiryCategories, validateContact } from "@/lib/contact";
export function ContactForm({
  configured,
  initialCategory,
}: {
  configured: boolean;
  initialCategory: string;
}) {
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    const form = e.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: fields.get("name"),
      email: fields.get("email"),
      category: fields.get("category"),
      message: fields.get("message"),
      website: fields.get("website") || "",
      startedAt,
    };
    const result = validateContact(payload);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setStatus(result.message || "Unable to confirm delivery.");
      if (response.ok) form.reset();
    } catch {
      setStatus(
        "Unable to connect. Your message has not been confirmed as sent.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="form" onSubmit={submit} aria-describedby="delivery-state">
      {!configured && (
        <div id="delivery-state" className="notice">
          <strong>Contact delivery is not configured.</strong>
          <br />
          You can explore the form, but messages cannot be sent yet. No
          submission will be reported as delivered.
        </div>
      )}
      {configured && (
        <p id="delivery-state" className="privacy-note">
          Messages are sent privately through the configured email provider.
        </p>
      )}
      <div className="field-pair">
        <label className="field">
          Your name
          <input
            autoComplete="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label className="field">
          Email address
          <input
            autoComplete="email"
            type="email"
            name="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label className="field">
        What brings you here?
        <select
          name="category"
          defaultValue={
            inquiryCategories.includes(
              initialCategory as (typeof inquiryCategories)[number],
            )
              ? initialCategory
              : "General conversation"
          }
        >
          {inquiryCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Your message
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={5000}
          placeholder="Tell me what you have in mind…"
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this blank
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="privacy-note">
        Please don’t include confidential information. Your name, email, and
        message will be used to respond to this inquiry.{" "}
        <a href="#privacy" style={{ textDecoration: "underline" }}>
          How contact data is handled
        </a>
        .
      </p>
      <button className="button" type="submit" disabled={busy || !configured}>
        {busy
          ? "Sending…"
          : configured
            ? "Send your message ↗"
            : "Email setup required"}
      </button>
      {status && (
        <div className="form-status" role="status" aria-live="polite">
          {status}
        </div>
      )}
    </form>
  );
}
