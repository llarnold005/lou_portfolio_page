import {
  PageIntro,
  TextLink,
  SectionLabel,
  ConnectBand,
} from "@/components/ui";
import { projects } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Selected Work",
  "Engineering initiatives at the intersection of AI security, observability, and responsible technology.",
  "/work",
);
export default function Work() {
  return (
    <>
      <PageIntro
        number="03"
        eyebrow="SELECTED WORK"
        title={
          <>
            Ideas become useful
            <br />
            when we <em>build.</em>
          </>
        }
      >
        <p>
          A growing body of engineering work. Focused on systems that are
          secure, understandable, and built with intention.
        </p>
      </PageIntro>
      <section className="section container">
        <SectionLabel number="01">THE FLAGSHIP INITIATIVE</SectionLabel>
        {projects.map((p) => (
          <div key={p.slug} className="project-feature">
            <div className="project-copy">
              <span className="status">
                {p.status.toUpperCase()} · {p.eyebrow}
              </span>
              <h3>{p.title}</h3>
              <p className="project-tagline">{p.summary}</p>
              <p>
                An evolving approach to understanding what AI and agentic
                systems actually do. Explore the problem, architectural
                direction, and current engineering focus.
              </p>
              <TextLink href={p.href}>Inside the project</TextLink>
            </div>
            <div className="project-graphic" aria-hidden="true">
              <div className="signal-lines" />
              <span className="resistance-glyph">R↗</span>
              <span className="graphic-label">
                EVIDENCE BEFORE ASSUMPTIONS.
              </span>
            </div>
          </div>
        ))}
        <div className="empty-state">
          <h2>More work will follow.</h2>
          <p>
            New projects will be added when there is substantive, shareable work
            to discuss. No employer-confidential architecture or private code is
            published here.
          </p>
        </div>
      </section>
      <ConnectBand />
    </>
  );
}
