import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getArticles,
  getArticle,
  publishedArticles,
  articleSchema,
  escapeXml,
} from "../src/lib/content";
import { initiativeSchema } from "../src/lib/site";
test("all demonstration articles are valid, readable, and excluded from publication", () => {
  const all = getArticles();
  assert.equal(all.length, 3);
  assert.equal(publishedArticles().length, 0);
  for (const a of all) {
    assert.equal(a.demo, true);
    assert.ok(a.readingMinutes >= 1);
    assert.ok(getArticle(a.slug)?.content.includes("##"));
  }
  assert.equal(getArticle("../../package"), null);
});
test("frontmatter requires category, summary, and real ISO dates", () => {
  assert.equal(
    articleSchema.safeParse({
      title: "Hello",
      summary: "A summary",
      date: "2026-02-30",
      category: "Engineering",
    }).success,
    false,
  );
  assert.equal(
    articleSchema.safeParse({
      title: "Hello",
      summary: "A summary",
      date: "2026-11-17",
      category: "Unknown",
    }).success,
    false,
  );
});
test("XML feed text is escaped", () => {
  assert.equal(escapeXml("A & B < C"), "A &amp; B &lt; C");
});
test("initiative schema supports outcomes and rejects invented status labels", () => {
  assert.equal(
    initiativeSchema.safeParse({
      name: "Example",
      mission: "Learn",
      location: "Local",
      status: "Exploring",
      description: "Not launched",
      outcomes: [],
      images: [],
      relatedWriting: [],
      participate: "Contact",
    }).success,
    true,
  );
});
