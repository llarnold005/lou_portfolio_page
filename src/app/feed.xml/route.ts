import { publishedArticles, escapeXml } from "@/lib/content";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export function GET() {
  const items = publishedArticles()
    .map(
      (a) =>
        `<item><title>${escapeXml(a.title)}</title><link>${escapeXml(a.externalUrl || `${site.url}/writing/${a.slug}`)}</link><guid isPermaLink="true">${escapeXml(`${site.url}/writing/${a.slug}`)}</guid><description>${escapeXml(a.summary)}</description><pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate><category>${escapeXml(a.category)}</category></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The Builders’ Voice</title><link>${escapeXml(site.url)}/writing</link><description>Engineering, independent thinking, and technology that serves people.</description><language>en</language><atom:link href="${escapeXml(site.url)}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
