import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Photograph } from "./photograph";
import { Headline, Reveal } from "./motion";
import { ButtonLink } from "./ui";
export function CinematicHero() {
  return (
    <section className="cinema-hero" id="who-i-am" aria-label="Who I am">
      <div className="cinema-image">
        <Photograph name="hero" hero />
        <div className="cinema-image-shade" aria-hidden="true" />
        <span className="cinema-coordinate" aria-hidden="true">
          nM / AN INDEPENDENT POINT OF VIEW
        </span>
      </div>
      <div className="cinema-copy">
        <Reveal>
          <p className="cinema-eyebrow">
            <span />
            THE ENGINEER. THE MAVERICK. THE BUILDER. THE ADVOCATE.
          </p>
        </Reveal>
        <Headline
          lines={[
            "I don’t just",
            "build technology.",
            "I question what",
            "we’re building",
            "it for.",
          ]}
        />
        <Reveal delay={0.15}>
          <p className="cinema-description">
            Cybersecurity Engineer. Independent Thinker.
            <br />
            Builder. Advocate.
          </p>
          <p className="cinema-belief">
            The future is something we build.
            <br />
            Who it serves is something we choose.
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/work">Explore my work</ButtonLink>
            <ButtonLink href="/writing" secondary>
              Read my writing
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <Link className="cinema-scroll" href="#what-i-believe">
        <span className="scroll-track" aria-hidden="true">
          <ArrowDown size={15} />
        </span>
        <span>
          SCROLL TO EXPLORE<small>01 — WHO I AM</small>
        </span>
      </Link>
      <span className="cinema-edition" aria-hidden="true">
        BUILD. ENVISION. CHALLENGE. EMPOWER.
      </span>
    </section>
  );
}
