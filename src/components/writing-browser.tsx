"use client";
import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/content";
import { categories } from "@/lib/site";
// Cards remain lightweight; content bodies are rendered only on server article routes.
export function WritingBrowser({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      `${a.title} ${a.summary} ${a.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="writing-tools">
        <label className="search-field">
          <Search size={19} />
          <span className="sr-only">Search articles</span>
          <input
            placeholder="Search ideas, topics, questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
          />
        </label>
        <label className="category-select" htmlFor="article-category">
          Category
        </label>
        <select
          id="article-category"
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <p className="results-status" role="status">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {filtered.every((a) => a.demo) && filtered.length > 0
          ? " · demonstration content"
          : ""}
      </p>
      <div className="writing-list">
        {filtered.map((a, i) => (
          <article className="writing-row" key={a.slug}>
            <span className="row-number">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="article-meta">
                <span>{a.category}</span>
                <span>{a.readingMinutes} MIN READ</span>
                {a.demo && <span>DEMONSTRATION</span>}
              </div>
              <h2>
                <Link href={a.externalUrl || `/writing/${a.slug}`}>
                  {a.title}
                </Link>
              </h2>
              <p>{a.summary}</p>
              <div className="tags">
                {a.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matching articles.</h2>
          <p>Try another topic or reset your filters.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
