import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  ArticleCard,
  ButtonLink,
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
      <section className="hero container">
        <div className="hero-copy">
          <SectionLabel number="01">ENGINEER. THINKER. BUILDER.</SectionLabel>
          <h1 className="hero-title">
            I build technology.
            <br />I question its impact.
            <br />I work to shape
            <br />
            <em>what comes next.</em>
          </h1>
          <p>
            I am a cybersecurity engineering leader and independent thinker
            exploring the intersection of AI, security, technology policy, and
            community empowerment.
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/work">Explore my work</ButtonLink>
            <ButtonLink href="/writing" secondary>
              Read my writing
            </ButtonLink>
          </div>
          <div className="hero-note">
            <span className="dot" />
            INDEPENDENT BY NATURE. A BUILDER BY CONVICTION.
          </div>
        </div>
        <div className="hero-visual">
          {site.portrait ? (
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              fill
              priority
              sizes="(max-width:800px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <>
              <div className="visual-grid" />
              <div className="visual-orbit" />
              <div className="visual-slab" />
              <span className="visual-cross">+</span>
              <span className="visual-coordinates">
                THE INTERSECTION OF POSSIBILITY & RESPONSIBILITY
              </span>
              <span className="portrait-note">
                PORTRAIT SPACE / A HUMAN STORY TO COME
              </span>
            </>
          )}
          <div className="visual-caption">
            <strong>The Maverick Builder</strong>
            <span>
              BUILD WITH PURPOSE.
              <br />
              THINK WITHOUT LIMITS.
            </span>
          </div>
        </div>
      </section>
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
      <section className="section container">
        <SectionLabel number="02">WHAT DRIVES ME</SectionLabel>
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
      </section>
      <section className="section container">
        <SectionLabel number="03">CURRENTLY BUILDING</SectionLabel>
        <div className="section-heading">
          <h2>
            Observe first.
            <br />
            Understand what follows.
          </h2>
          <TextLink href="/work">All selected work</TextLink>
        </div>
        <div className="project-feature">
          <div className="project-copy">
            <span className="status">IN DEVELOPMENT · AI SECURITY</span>
            <h3>The Resistance</h3>
            <p className="project-tagline">Making AI actions visible.</p>
            <p>
              As AI gains the ability to act, we need to understand what it
              actually does. An evolving security and observability initiative
              for investigating AI activity.
            </p>
            <TextLink href="/work/the-resistance">Explore the project</TextLink>
          </div>
          <div className="project-graphic" aria-hidden="true">
            <div className="signal-lines" />
            <span className="graphic-corner">VISIBILITY → ACCOUNTABILITY</span>
            <span className="resistance-glyph">R↗</span>
            <span className="graphic-label">
              THE RESISTANCE / CONCEPTUAL SYSTEM STUDY
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
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
        <div className="article-grid">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>
      <section className="impact-home container">
        <div>
          <SectionLabel number="05">BEYOND THE CODE</SectionLabel>
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
