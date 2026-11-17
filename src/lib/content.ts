import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { categories } from "./site";
export const articleSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.iso.date(),
  category: z.enum(categories),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  demo: z.boolean().default(false),
  series: z.string().optional(),
  externalUrl: z
    .url()
    .refine((url) => url.startsWith("https://"), "External links require HTTPS")
    .optional(),
});
export type Article = z.infer<typeof articleSchema> & {
  slug: string;
  readingMinutes: number;
};
export function getArticles(): Article[] {
  const dir = path.join(process.cwd(), "content/writing");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      return {
        ...articleSchema.parse(data),
        slug: file.replace(/\.mdx$/, ""),
        readingMinutes: Math.max(
          1,
          Math.ceil(content.split(/\s+/).length / 220),
        ),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getArticle(slug: string) {
  const article = getArticles().find((a) => a.slug === slug);
  if (!article) return null;
  return {
    article,
    content: matter(
      fs.readFileSync(
        path.join(process.cwd(), "content/writing", `${article.slug}.mdx`),
        "utf8",
      ),
    ).content,
  };
}
export function publishedArticles() {
  return getArticles().filter((a) => !a.demo);
}
export function projectContent(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Invalid project slug");
  return fs.readFileSync(
    path.join(process.cwd(), "content/projects", `${slug}.mdx`),
    "utf8",
  );
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
export function escapeXml(s: string) {
  return s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}
