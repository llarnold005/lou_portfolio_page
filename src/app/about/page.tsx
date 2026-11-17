import { Photograph } from "@/components/photograph";
import { Reveal } from "@/components/motion";
import { PageIntro, ConnectBand, SectionLabel } from "@/components/ui";
import { career, milestones } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "My Story",
  "An engineering career, an independent perspective, and a belief in the responsibility of builders.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        number="01"
        eyebrow="MY STORY"
        title={
          <>
            A builder’s mindset.
            <br />A wider <em>responsibility.</em>
          </>
        }
      >
        <p>My work begins with engineering. My questions extend beyond it.</p>
        <p>
          I work at the intersection of cybersecurity, complex systems, and the
          human consequences of technological change.
        </p>
      </PageIntro>
      <div className="container">
        <Reveal className="story-photo-layout">
          <Photograph name="about" />
          <blockquote>
            “Building the future also means taking responsibility for who
            benefits from it.”
            <span>THE MAVERICK BUILDER / A GUIDING BELIEF</span>
          </blockquote>
        </Reveal>
        {[
          [
            "The Engineer",
            "I design, build, and secure complex technology systems. My background spans cloud security engineering, cybersecurity architecture, enterprise security, SaaS security, and technical leadership.",
            "The most interesting engineering challenges demand more than a tool. They require an understanding of how systems connect, where trust lives, and what happens when assumptions fail.",
          ],
          [
            "The Thinker",
            "Building technology raises questions that engineering alone cannot answer. Who sets the rules? Who gains influence? Who benefits from the systems we create?",
            "The nMaverick identity reflects an independent approach: question inherited assumptions, follow the evidence, and stay willing to change your mind.",
          ],
          [
            "The Builder",
            "I am exploring AI and agentic systems as both an engineering frontier and a test of accountability. The Resistance is one expression of that work.",
            "I want to make systems easier to observe and investigate, while being clear about what is in development and what remains a vision.",
          ],
          [
            "The Responsibility",
            "I believe progress should create meaningful opportunities beyond the institutions and individuals who build it.",
            "My interest in technology education, public policy, and economic mobility comes from that belief. The next step is listening, learning, and finding useful ways to contribute.",
          ],
        ].map(([title, a, b], i) => (
          <section key={title} className="two-column">
            <div>
              <span className="story-number">0{i + 1} / THE STORY</span>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{a}</p>
              <p>{b}</p>
            </div>
          </section>
        ))}
        <section className="two-column">
          <div>
            <SectionLabel number="05">EXPERIENCE</SectionLabel>
            <h2 style={{ marginTop: 24 }}>
              An evolving
              <br />
              engineering practice.
            </h2>
          </div>
          <div>
            <p>
              Areas of professional experience. Verified dates and employer
              details can be added to this editable timeline.
            </p>
            {career.map((c) => (
              <div className="career-row" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <SectionLabel number="06">MILESTONES & CONVERSATIONS</SectionLabel>
          {milestones.length ? (
            milestones.map((m) => (
              <article className="career-row" key={m.title}>
                <span className="eyebrow">{m.date}</span>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Room for the work ahead.</h2>
              <p>
                Future speaking engagements, publications, and professional
                milestones will appear here when there are confirmed details to
                share.
              </p>
            </div>
          )}
        </section>
      </div>
      <ConnectBand />
    </>
  );
}
