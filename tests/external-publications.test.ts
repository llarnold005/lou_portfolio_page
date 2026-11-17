import { test } from "node:test";
import assert from "node:assert/strict";
import { externalPublications } from "../src/lib/external-publications";
test("external publication adapter accepts real records, excludes demos, and fails gracefully", async () => {
  const saved = global.fetch;
  process.env.PUBLICATIONS_FEED_URL =
    "https://publications.example.org/feed.json";
  const record = {
    title: "External example",
    summary: "A test record, not site content",
    date: "2026-11-17",
    category: "Engineering",
    slug: "test-record",
    externalUrl: "https://publication.example.org/test",
    readingMinutes: 4,
  };
  try {
    global.fetch = async () =>
      new Response(
        JSON.stringify([record, { ...record, slug: "demo", demo: true }]),
      );
    const result = await externalPublications();
    assert.equal(result.unavailable, false);
    assert.equal(result.articles.length, 1);
    global.fetch = async () =>
      new Response(
        JSON.stringify([{ ...record, externalUrl: "javascript:alert(1)" }]),
      );
    assert.equal((await externalPublications()).unavailable, true);
  } finally {
    global.fetch = saved;
    delete process.env.PUBLICATIONS_FEED_URL;
  }
});
