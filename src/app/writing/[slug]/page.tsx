import { ReadingProgress } from "@/components/motion";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle, getArticles, formatDate } from "@/lib/content";
import { Content } from "@/components/mdx";
import { ArticleCard, TextLink } from "@/components/ui";
import { Share } from "@/components/share";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getArticle(slug);
  if (!result) return {};
  const a = result.article;
  return {
    ...pageMetadata(a.title, a.summary, `/writing/${slug}`),
    robots: a.demo ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      publishedTime: a.date,
      url: `/writing/${slug}`,
      images: ["/opengraph-image"],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getArticle(slug);
  if (!result) notFound();
  const { article: a, content } = result;
  const related = getArticles()
    .filter((b) => b.slug !== slug && b.demo === a.demo)
    .sort(
      (x, y) =>
        Number(y.category === a.category) - Number(x.category === a.category),
    )
    .slice(0, 2);
  return (
    <>
      <ReadingProgress>
        <article className="reading-shell">
          <TextLink href="/writing">Back to The Builders’ Voice</TextLink>
          <header className="reading-header">
            <div className="article-meta">
              <span>{a.category}</span>
              {a.series && <span>{a.series}</span>}
            </div>
            <h1>{a.title}</h1>
            <p className="summary">{a.summary}</p>
            {a.demo && (
              <div className="notice">
                <strong>Demonstration content.</strong> This is a reading
                preview, not a published essay attributed to the owner. It is
                excluded from feeds and search indexing.
              </div>
            )}
            <div className="reading-meta">
              <time dateTime={a.date}>
                {a.demo ? "Sample date: " : ""}
                {formatDate(a.date)}
              </time>
              <span>{a.readingMinutes} min read</span>
            </div>
            <div className="tags">
              {a.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </header>
          {a.externalUrl ? (
            <div className="empty-state">
              <h2>Read at the original publication</h2>
              <a
                className="button"
                href={a.externalUrl}
                rel="noopener noreferrer"
              >
                Continue to article ↗
              </a>
            </div>
          ) : (
            <Content source={content} />
          )}
          <Share />
          {!a.demo && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: a.title,
                  description: a.summary,
                  datePublished: a.date,
                  url: `${site.url}/writing/${slug}`,
                  image: `${site.url}/opengraph-image`,
                  ...(site.personName
                    ? { author: { "@type": "Person", name: site.personName } }
                    : {}),
                }).replace(/</g, "\\u003c"),
              }}
            />
          )}
        </article>
      </ReadingProgress>
      <section className="container section">
        <div className="section-heading">
          <h2>{a.demo ? "More reading previews" : "Related thinking"}</h2>
        </div>
        <div className="article-grid">
          {related.map((r, i) => (
            <ArticleCard key={r.slug} article={r} index={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
