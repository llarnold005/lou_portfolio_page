import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/content";
import { formatDate } from "@/lib/content";
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      {children}
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PageIntro({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <SectionLabel number={number}>{eyebrow}</SectionLabel>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}
export function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <article className="article-card">
      <Link
        href={article.externalUrl || `/writing/${article.slug}`}
        className="article-art-link"
        aria-label={`Read ${article.title}`}
      >
        <div className={`article-art art-${index % 3}`} aria-hidden="true">
          <span className="art-grid" />
          <span className="art-shape" />
          <span className="art-index">
            {String(index + 1).padStart(2, "0")} / FIELD NOTES
          </span>
          <ArrowUpRight size={23} />
        </div>
      </Link>
      <div className="article-meta">
        <span>{article.category}</span>
        <span>{article.readingMinutes} MIN READ</span>
      </div>
      {article.demo && (
        <span className="demo-label">DEMONSTRATION · NOT PUBLISHED</span>
      )}
      <h3>
        <Link href={article.externalUrl || `/writing/${article.slug}`}>
          {article.title}
        </Link>
      </h3>
      <p>{article.summary}</p>
      <div className="article-bottom">
        <time dateTime={article.date}>
          {article.demo ? "Sample date · " : ""}
          {formatDate(article.date)}
        </time>
        <ArrowRight size={16} />
      </div>
    </article>
  );
}
export function ConnectBand() {
  return (
    <section className="connect-band">
      <div className="container connect-inner">
        <div>
          <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
          <h2>
            What could we
            <br />
            build <em>together?</em>
          </h2>
        </div>
        <div>
          <p>
            An idea to explore. A problem worth solving.
            <br />A different way to see what comes next.
          </p>
          <ButtonLink href="/contact">Let’s start a conversation</ButtonLink>
        </div>
      </div>
    </section>
  );
}
