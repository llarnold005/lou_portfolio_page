import { Photograph } from "@/components/photograph";
import Image from "next/image";
import { PageIntro, SectionLabel, ButtonLink, TextLink } from "@/components/ui";
import { initiatives } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Community & Impact",
  "A philosophy of technology education, community opportunity, and progress that reaches more people.",
  "/impact",
);
export default function Impact() {
  return (
    <>
      <PageIntro
        number="04"
        eyebrow="COMMUNITY & OPPORTUNITY"
        title={
          <>
            Technology should
            <br />
            <em>open doors.</em>
          </>
        }
      >
        <p>
          Progress is meaningful when it expands what people can do with their
          lives. I want to help connect technological access, education, and
          practical knowledge to economic opportunity.
        </p>
      </PageIntro>
      <div className="container">
        <Photograph name="community" className="impact-photograph" />
        <section className="two-column">
          <div>
            <SectionLabel number="01">THE PHILOSOPHY</SectionLabel>
            <h2 style={{ marginTop: 24 }}>
              Access. Knowledge.
              <br />
              Agency.
            </h2>
          </div>
          <div>
            <p>
              New tools alone do not guarantee a better future. The ability to
              understand, question, and use those tools matters just as much.
            </p>
            <p>
              My long-term interest is in community-led approaches: learning
              from local needs, expanding AI literacy, creating pathways into
              technical work, and bringing public-interest perspectives into
              technology policy.
            </p>
            <p>
              This is a direction for future work. No completed initiatives,
              partnerships, donations, or measured outcomes are claimed here.
            </p>
          </div>
        </section>
        <section className="section">
          <SectionLabel number="02">WHERE I WANT TO CONTRIBUTE</SectionLabel>
          <div className="pillar-grid" style={{ marginTop: 35 }}>
            {[
              [
                "Technology education",
                "Practical knowledge that helps people build, understand, and participate.",
              ],
              [
                "AI literacy",
                "Accessible conversations about how AI affects work, rights, and daily life.",
              ],
              [
                "Economic mobility",
                "Exploring how technical access can connect to durable opportunity.",
              ],
              [
                "Public interest",
                "Policy and partnerships shaped by the communities technology affects.",
              ],
            ].map(([title, text], i) => (
              <article className="pillar" key={title}>
                <span className="story-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section">
          <SectionLabel number="03">INITIATIVES & OUTCOMES</SectionLabel>
          {initiatives.length ? (
            initiatives.map((n) => (
              <article className="empty-state" key={n.name}>
                <span className="eyebrow">
                  {n.status} · {n.location}
                </span>
                <h2>{n.name}</h2>
                <h3>{n.mission}</h3>
                <p>{n.description}</p>
                {n.images.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={500}
                  />
                ))}
                <ul>
                  {n.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <p>{n.participate}</p>
                {n.relatedWriting.map((slug) => (
                  <TextLink key={slug} href={`/writing/${slug}`}>
                    Related writing
                  </TextLink>
                ))}
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Starting with intention.</h2>
              <p>
                There are no launched community initiatives or impact reports to
                share yet. This space will document real programs, their
                progress, and what we learn as work develops.
              </p>
              <TextLink href="/contact?category=Community%20initiatives">
                Bring a community perspective
              </TextLink>
            </div>
          )}
        </section>
        <section className="section">
          <div className="section-heading">
            <h2>
              Start with a conversation.
              <br />
              Build from a real need.
            </h2>
            <ButtonLink href="/contact?category=Community%20initiatives">
              Let’s explore what’s possible
            </ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
