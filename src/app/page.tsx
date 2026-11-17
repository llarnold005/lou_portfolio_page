import { CinematicHero } from "@/components/cinematic-hero";
import { Photograph } from "@/components/photograph";
import { Reveal } from "@/components/motion";
import { ArrowUpRight } from "lucide-react";
import {
  ArticleCard,
  ConnectBand,
  SectionLabel,
  TextLink,
} from "@/components/ui";
import { getArticles } from "@/lib/content";
import { pillars, site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Build. Envision. Challenge. Empower.",
  site.description,
  "/",
);
export default function Home() {
  const articles = getArticles()
    .filter((a) => a.featured)
    .slice(0, 3);
  return (
    <>
      <CinematicHero />
      <nav className="chapter-rail" aria-label="Story chapters">
        <a href="#who-i-am">
          01 <span>Who I am</span>
        </a>
        <a href="#what-i-believe">
          02 <span>What I believe</span>
        </a>
        <a href="#what-im-building">
          03 <span>What I’m building</span>
        </a>
        <a href="#what-im-thinking">
          04 <span>What I’m thinking</span>
        </a>
        <a href="#what-im-changing">
          05 <span>What I’m working to change</span>
        </a>
      </nav>
      <div className="brand-ribbon container">
        <span>BUILD.</span>
        <span className="ribbon-dot">✳</span>
        <span>ENVISION.</span>
        <span className="ribbon-dot">✳</span>
        <span>CHALLENGE.</span>
        <span className="ribbon-dot">✳</span>
        <span>EMPOWER.</span>
        <span>TECHNOLOGY SHOULD SERVE PEOPLE.</span>
      </div>
      <section className="section container story-chapter" id="what-i-believe">
        <SectionLabel number="02">WHAT I BELIEVE</SectionLabel>
        <div className="section-heading">
          <h2>
            One perspective.
            <br />
            Four connected instincts.
          </h2>
          <p>
            Building the future also means taking responsibility for who
            benefits from it.
          </p>
        </div>
        <Reveal>
          <div className="pillar-grid">
            {pillars.map((p) => (
              <article className="pillar" key={p.name}>
                <a href={p.href}>
                  <div className="pillar-top">
                    <span>/{p.number}</span>
                    <ArrowUpRight size={20} />
                  </div>
                  <h3>{p.name}.</h3>
                  <strong>{p.verb}</strong>
                  <p>{p.text}</p>
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section
        className="section container story-chapter"
        id="what-im-building"
      >
        <SectionLabel number="03">CURRENTLY BUILDING</SectionLabel>
        <div className="section-heading">
          <h2>
            Observe first.
            <br />
            Understand what follows.
          </h2>
          <TextLink href="/work">All selected work</TextLink>
        </div>
        <Reveal className="project-reveal">
          <div className="project-feature interactive-project">
            <div className="project-copy">
              <span className="status">IN DEVELOPMENT · AI SECURITY</span>
              <h3>The Resistance</h3>
              <p className="project-tagline">Making AI actions visible.</p>
              <p>
                As AI gains the ability to act, we need to understand what it
                actually does. An evolving security and observability initiative
                for investigating AI activity.
              </p>
              <TextLink href="/work/the-resistance">
                Explore the project
              </TextLink>
            </div>
            <div className="project-graphic" aria-hidden="true">
              <div className="signal-lines" />
              <span className="graphic-corner">
                VISIBILITY → ACCOUNTABILITY
              </span>
              <span className="resistance-glyph">R↗</span>
              <span className="graphic-label">
                THE RESISTANCE / CONCEPTUAL SYSTEM STUDY
              </span>
            </div>
          </div>
        </Reveal>
      </section>
      <section
        className="section container story-chapter"
        id="what-im-thinking"
      >
        <SectionLabel number="04">LATEST THINKING</SectionLabel>
        <div className="section-heading">
          <div>
            <span className="eyebrow" style={{ marginBottom: 12 }}>
              THE BUILDERS’ VOICE
            </span>
            <h2>Questions worth staying with.</h2>
          </div>
          <TextLink href="/writing">Explore the publication</TextLink>
        </div>
        {articles.every((a) => a.demo) && (
          <p className="notice" style={{ marginBottom: 30 }}>
            The publication is taking shape. These reading previews are
            demonstration content, not published essays.
          </p>
        )}
        <Reveal>
          <div className="article-grid featured-grid">
            {articles.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </Reveal>
      </section>
      <section
        className="impact-home container story-chapter"
        id="what-im-changing"
      >
        <div>
          <SectionLabel number="05">BEYOND THE CODE</SectionLabel>
          <Photograph name="community" className="community-photo" />
          <h2>
            Progress means more
            <br />
            when it <em>reaches more.</em>
          </h2>
        </div>
        <div>
          <p>
            Technology can create extraordinary possibilities. The question is
            whether those possibilities reach the people and communities who
            need them.
          </p>
          <p>
            I’m interested in the work that turns access into agency: education,
            AI literacy, community-led innovation, and pathways to economic
            opportunity. These are ambitions to develop, not claims of programs
            already launched.
          </p>
          <div className="topic-list">
            <span>Technology education</span>
            <span>AI policy</span>
            <span>Economic mobility</span>
          </div>
          <TextLink href="/impact">Explore my approach to impact</TextLink>
        </div>
      </section>
      <ConnectBand />
    </>
  );
}
