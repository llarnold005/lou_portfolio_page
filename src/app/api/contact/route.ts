import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import {
  contactConfigured,
  localRateLimit,
  validateContact,
} from "@/lib/contact";
export const runtime = "nodejs";
function response(message: string, status: number) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
}
async function rateLimit(key: string) {
  if (process.env.NODE_ENV !== "production") return localRateLimit(key);
  const url = new URL(process.env.UPSTASH_REDIS_REST_URL!);
  if (url.protocol !== "https:")
    throw new Error("Secure rate limit endpoint required");
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n",
      "1",
      `contact:${key}`,
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!result.ok) throw new Error("Rate limit service unavailable");
  const data = await result.json();
  if (typeof data.result !== "number")
    throw new Error("Invalid rate limit response");
  return data.result <= 5;
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(process.env.SITE_URL || "http://localhost:3000")
    .origin;
  if (!origin || origin !== expected)
    return response("This request must come from this website.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response("Expected a JSON request.", 415);
  if (!contactConfigured())
    return response(
      "Email delivery is not configured yet. Your message has not been sent.",
      503,
    );
  // Vercel overwrites this header at its trusted edge. Never trust arbitrary X-Forwarded-For.
  const ip =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
      : "local-development";
  if (!ip)
    return response(
      "Unable to verify request origin. Please try again later.",
      503,
    );
  const key = createHash("sha256").update(ip).digest("hex");
  try {
    if (!(await rateLimit(key)))
      return response(
        "Too many requests. Please try again in 10 minutes.",
        429,
      );
  } catch {
    return response(
      "Message protection is temporarily unavailable. Please try again later.",
      503,
    );
  }
  // Bound the stream, including requests without Content-Length.
  let raw = "";
  const reader = request.body?.getReader();
  if (!reader) return response("A message is required.", 400);
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) {
        await reader.cancel();
        return response("This message is too large.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return response("Unable to read the message.", 400);
  }
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return response("Invalid message format.", 400);
  }
  const validation = validateContact(input);
  if (!validation.ok) return response(validation.error, 400);
  const data = validation.data;
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Website inquiry: ${data.category}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nCategory: ${data.category}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok)
      return response(
        "Delivery failed. Please try again later. Your message has not been confirmed as sent.",
        502,
      );
    const delivery = await result.json();
    if (typeof delivery.id !== "string")
      return response(
        "Delivery could not be confirmed. Please try again later.",
        502,
      );
    return response(
      "Your message was accepted for delivery. Thank you for reaching out.",
      200,
    );
  } catch {
    return response(
      "Delivery could not be confirmed. Please try again later.",
      502,
    );
  }
}
