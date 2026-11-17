import { PageIntro, TextLink } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { contactConfigured, inquiryCategories } from "@/lib/contact";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact & Collaboration",
  "An invitation to collaborate on engineering, writing, AI security, and community opportunity.",
  "/contact",
);
export const dynamic = "force-dynamic";
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageIntro
        number="06"
        eyebrow="CONTACT & COLLABORATION"
        title={
          <>
            A conversation can
            <br />
            change <em>what comes next.</em>
          </>
        }
      >
        <p>
          Bring a question, a possibility, or a problem worth solving. I’m
          interested in thoughtful exchanges and work with a purpose.
        </p>
      </PageIntro>
      <div className="container contact-grid">
        <section>
          <h2>Let’s find common ground.</h2>
          <p>
            Whether you’re building a system, exploring an idea, or working to
            create opportunity, this is a place to start.
          </p>
          <ul className="inquiry-list">
            {inquiryCategories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {site.socials.length ? (
            site.socials.map((s) => (
              <TextLink key={s.label} href={s.url}>
                {s.label}
              </TextLink>
            ))
          ) : (
            <p>
              Social profiles will be added when the owner provides verified
              links.
            </p>
          )}
        </section>
        <ContactForm
          configured={contactConfigured()}
          initialCategory={params.category || ""}
        />
      </div>
      <section id="privacy" className="container section">
        <h2>Contact privacy</h2>
        <p
          style={{
            maxWidth: 760,
            marginTop: 20,
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          When delivery is configured, the form sends your name, email address,
          inquiry category, and message to the site owner through Resend. This
          application does not store message content in a database. A hashed
          network address is used for abuse prevention with a 10-minute counter
          in the rate-limiting service. Email providers and the recipient
          mailbox retain messages according to their settings. No analytics or
          advertising trackers are installed. Before launch, the owner should
          publish their identity, applicable privacy contact, and retention
          policy.
        </p>
      </section>
    </>
  );
}
