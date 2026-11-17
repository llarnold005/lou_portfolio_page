import type { MetadataRoute } from "next";
import { publishedArticles } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/writing",
    "/work",
    "/work/the-resistance",
    "/impact",
    "/ideas",
    "/contact",
    ...publishedArticles().map((a) => `/writing/${a.slug}`),
  ].map((path) => ({ url: `${site.url}${path}` }));
}
