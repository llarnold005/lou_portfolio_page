import { ArchitectureExplorer } from "@/components/architecture-explorer";
import {
  PageIntro,
  SectionLabel,
  ButtonLink,
  ArticleCard,
} from "@/components/ui";
import { Content } from "@/components/mdx";
import { architecture, site } from "@/lib/site";
import { getArticles, projectContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "The Resistance",
  "An AI security observability initiative: making agent actions visible, understandable, and investigable.",
  "/work/the-resistance",
);
export default function Resistance() {
  return (
    <>
      <PageIntro
        number="03.1"
        eyebrow="THE RESISTANCE / IN DEVELOPMENT"
        title={
          <>
            We cannot secure
            <br />
            what we cannot <em>observe.</em>
          </>
        }
      >
        <p>
          Making AI actions visible. An AI security and observability initiative
          for understanding, investigating, and identifying potentially risky
          AI-driven activity.
        </p>
      </PageIntro>
      <section className="project-banner">
        <div className="container">
          <span className="status">
            DEVELOPMENT INITIATIVE · NOT A PRODUCTION PLATFORM
          </span>
          <h2>
            When software can act,
            <br />
            security needs the whole story.
          </h2>
          <p>
            The goal is evidence: what was accessed, what was attempted, which
            permissions applied, and where expected boundaries may have been
            crossed.
          </p>
        </div>
      </section>
      <section className="container section">
        <SectionLabel number="01">A CONCEPTUAL ARCHITECTURE</SectionLabel>
        <div className="section-heading">
          <h2>
            From activity
            <br />
            to understanding.
          </h2>
          <p>
            A simplified model of the platform vision. These stages are
            architectural direction, not a list of shipped features.
          </p>
        </div>
        <ArchitectureExplorer />
        <details className="architecture-text">
          <summary>Read the complete architecture as text</summary>
          <ol>
            {architecture.map((stage) => (
              <li key={stage.id}>
                <h3>{stage.title}</h3>
                <p>{stage.simple}</p>
                <p>{stage.technical}</p>
                <strong>{stage.status}</strong>
              </li>
            ))}
          </ol>
        </details>
      </section>
      <section className="reading-shell">
        <Content source={projectContent("the-resistance")} />
      </section>
      <section className="container section">
        <SectionLabel number="02">DEVELOPMENT PROGRESS</SectionLabel>
        <div className="section-heading">
          <h2>
            Ambitious direction.
            <br />
            Explicit boundaries.
          </h2>
        </div>
        <div className="progress-grid">
          <article className="progress-card">
            <span className="eyebrow">IMPLEMENTED</span>
            <h3 style={{ marginTop: 15 }}>Verification pending</h3>
            <p>
              No implementation milestones have been independently verified for
              publication here. This is not a claim that the project has no
              code; it is a boundary on what this site can substantiate.
            </p>
          </article>
          <article className="progress-card">
            <span className="eyebrow">IN DEVELOPMENT</span>
            <h3 style={{ marginTop: 15 }}>Engineering streams</h3>
            <ul>
              <li>Java event-processing pipeline and Kafka integration</li>
              <li>Validation and reliable consumption</li>
              <li>Python evidence retrieval and investigation services</li>
              <li>Event-reference validation and findings</li>
            </ul>
            <p>
              Development focus supplied by the owner; delivery milestones
              unverified.
            </p>
          </article>
          <article className="progress-card">
            <span className="eyebrow">PLANNED</span>
            <h3 style={{ marginTop: 15 }}>The longer horizon</h3>
            <ul>
              <li>OCSF-aligned normalization</li>
              <li>Correlation and enrichment</li>
              <li>Security detections</li>
              <li>Agentic investigation orchestration</li>
              <li>Potential remediation workflows</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>Engineering field notes.</h2>
        </div>
        <p className="notice" style={{ marginBottom: 25 }}>
          Related demonstration content. Real engineering articles will replace
          these previews.
        </p>
        <div className="article-grid">
          {getArticles()
            .filter((a) => a.category === "Engineering")
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>Working on similar questions?</h2>
          <ButtonLink href="/contact?category=The%20Resistance">
            Explore a collaboration
          </ButtonLink>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "The Resistance",
            url: `${site.url}/work/the-resistance`,
            description:
              "An AI security observability initiative in development. Implementation milestones not verified.",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
