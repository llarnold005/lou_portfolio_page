import { z } from "zod";
export const inquiryCategories = [
  "Engineering collaboration",
  "Speaking and interviews",
  "Research and writing",
  "Community initiatives",
  "The Resistance",
  "General conversation",
] as const;
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z.email("Please enter a valid email address.").max(254),
    category: z.enum(inquiryCategories),
    message: z
      .string()
      .trim()
      .min(20, "Please write at least 20 characters.")
      .max(5000),
    website: z.string().max(200).default(""),
    startedAt: z.number().int().positive(),
  })
  .strict();
export function validateContact(input: unknown, now = Date.now()) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success)
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message || "Please check your message.",
    };
  if (
    parsed.data.website ||
    now - parsed.data.startedAt < 3000 ||
    now - parsed.data.startedAt > 86400000
  )
    return {
      ok: false as const,
      error:
        "Unable to accept this request. Please wait a moment or refresh and try again.",
    };
  return { ok: true as const, data: parsed.data };
}
const buckets = new Map<string, { count: number; expires: number }>();
export function localRateLimit(key: string, now = Date.now()) {
  for (const [k, v] of buckets) if (v.expires <= now) buckets.delete(k);
  if (buckets.size >= 10000 && !buckets.has(key)) return false;
  const current = buckets.get(key) || { count: 0, expires: now + 600000 };
  current.count++;
  buckets.set(key, current);
  return current.count <= 5;
}
export function contactConfigured() {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL &&
    (process.env.NODE_ENV !== "production" ||
      (process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN &&
        process.env.VERCEL === "1"))
  );
}
