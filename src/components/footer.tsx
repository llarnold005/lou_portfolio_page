import Link from "next/link";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <Link href="/" className="footer-brand">
          nMaverick<span>Build. Envision. Challenge. Empower.</span>
        </Link>
        <div className="footer-links">
          <Link href="/ideas">Ideas & notes</Link>
          <Link href="/writing">The Builders’ Voice</Link>
          <Link href="/feed.xml">RSS feed</Link>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              rel="me noopener noreferrer"
              target="_blank"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} The Maverick Builder</span>
        <span>INDEPENDENT THINKING. INTENTIONAL BUILDING.</span>
        <Link href="/contact#privacy">Privacy & contact</Link>
      </div>
    </footer>
  );
}
