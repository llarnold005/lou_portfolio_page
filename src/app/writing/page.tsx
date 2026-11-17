import { PageIntro, TextLink } from "@/components/ui";
import { WritingBrowser } from "@/components/writing-browser";
import { getArticles } from "@/lib/content";
import { externalPublications } from "@/lib/external-publications";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "The Builders’ Voice",
  "Essays on engineering, artificial intelligence, policy, and the responsibility of builders.",
  "/writing",
);
export const dynamic = "force-dynamic";
export default async function Writing() {
  const external = await externalPublications();
  const articles = [...getArticles(), ...external.articles].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const hasPublished = articles.some((a) => !a.demo);
  return (
    <>
      <PageIntro
        number="02"
        eyebrow="THE BUILDERS’ VOICE"
        title={
          <>
            Ideas deserve
            <br />
            <em>room to unfold.</em>
          </>
        }
      >
        <p>
          A publication about the systems we build, the assumptions we question,
          and the futures we make possible.
        </p>
      </PageIntro>
      <section className="container section">
        {!hasPublished && (
          <div className="notice">
            No essays have been published yet. The reading previews below
            demonstrate the publication experience and are excluded from RSS and
            the sitemap.
          </div>
        )}
        {external.unavailable && (
          <p className="notice">
            External publications are temporarily unavailable. Local articles
            remain available below.
          </p>
        )}
        <WritingBrowser articles={articles} />
        <div className="section-heading">
          <p>
            For unfinished questions and shorter reflections, there’s a quieter
            corner of the site.
          </p>
          <TextLink href="/ideas">Visit the digital notebook</TextLink>
        </div>
        <TextLink href="/feed.xml">Subscribe via RSS</TextLink>
      </section>
    </>
  );
}
