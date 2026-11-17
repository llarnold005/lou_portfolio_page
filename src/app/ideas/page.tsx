import { PageIntro, TextLink } from "@/components/ui";
import { ideas } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Ideas & Notes",
  "A digital notebook for unfinished questions, reading notes, and independent reflections.",
  "/ideas",
);
export default function Ideas() {
  return (
    <>
      <PageIntro
        number="05"
        eyebrow="THE DIGITAL NOTEBOOK"
        title={
          <>
            Not every thought
            <br />
            begins as <em>an essay.</em>
          </>
        }
      >
        <p>
          A place for short reflections, reading notes, thought experiments, and
          questions worth returning to. A working notebook, rather than a
          finished argument.
        </p>
      </PageIntro>
      <section className="container section">
        {ideas.length ? (
          ideas.map((n) => (
            <article key={n.title} className="writing-row">
              <time className="row-number" dateTime={n.date}>
                {n.date}
              </time>
              <div>
                <span className="eyebrow">{n.kind}</span>
                <h2>{n.title}</h2>
                <p>{n.body}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <h2>A blank page is a beginning.</h2>
            <p>
              No notebook entries have been published yet. Future notes will
              explore engineering, policy, emerging technology, and the
              assumptions worth questioning.
            </p>
            <TextLink href="/writing">Explore the publication</TextLink>
          </div>
        )}
      </section>
    </>
  );
}
