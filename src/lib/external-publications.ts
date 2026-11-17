import { z } from "zod";
import { articleSchema, type Article } from "./content";
const feedSchema = z
  .array(
    articleSchema.extend({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      externalUrl: z
        .url()
        .refine(
          (url) => url.startsWith("https://"),
          "External publications require HTTPS",
        ),
      readingMinutes: z.number().int().min(1).max(240),
    }),
  )
  .max(100);
export async function externalPublications(): Promise<{
  articles: Article[];
  unavailable: boolean;
}> {
  const endpoint = process.env.PUBLICATIONS_FEED_URL;
  if (!endpoint) return { articles: [], unavailable: false };
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Feed unavailable");
    const text = await response.text();
    if (text.length > 200000) throw new Error("Feed too large");
    return {
      articles: feedSchema.parse(JSON.parse(text)).filter((a) => !a.demo),
      unavailable: false,
    };
  } catch {
    return { articles: [], unavailable: true };
  }
}
