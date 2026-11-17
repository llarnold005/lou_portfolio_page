import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact, localRateLimit } from "../src/lib/contact";
import { POST } from "../src/app/api/contact/route";
const now = Date.now();
const valid = {
  name: "Test Reader",
  email: "reader@example.org",
  category: "Engineering collaboration",
  message: "A thoughtful test message about collaboration.",
  website: "",
  startedAt: now - 5000,
};
test("valid contact payload passes, malformed and abusive payloads fail", () => {
  assert.equal(validateContact(valid, now).ok, true);
  for (const change of [
    { email: "bad" },
    { name: "x" },
    { message: "short" },
    { message: "x".repeat(5001) },
    { category: "Unknown" },
    { website: "spam" },
    { startedAt: now },
    { startedAt: now + 50000 },
  ])
    assert.equal(validateContact({ ...valid, ...change }, now).ok, false);
});
test("local rate limiter blocks sixth attempt and expires", () => {
  for (let i = 0; i < 5; i++) assert.equal(localRateLimit("test", now), true);
  assert.equal(localRateLimit("test", now), false);
  assert.equal(localRateLimit("test", now + 600001), true);
});
test("contact endpoint rejects cross-origin requests and reports missing setup honestly", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.SITE_URL;
  const cross = await POST(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        origin: "https://untrusted.example",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valid),
    }),
  );
  assert.equal(cross.status, 403);
  const unconfigured = await POST(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valid),
    }),
  );
  assert.equal(unconfigured.status, 503);
  assert.match((await unconfigured.json()).message, /not been sent/);
});
test("configured endpoint validates, delivers through provider, and handles failure", async () => {
  const saved = global.fetch;
  Object.assign(process.env, {
    NODE_ENV: "test",
    RESEND_API_KEY: "test-placeholder",
    CONTACT_TO_EMAIL: "recipient@example.org",
    CONTACT_FROM_EMAIL: "sender@example.org",
  });
  function req(body: unknown) {
    return new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  try {
    const bad = await POST(req({ ...valid, email: "bad" }));
    assert.equal(bad.status, 400);
    global.fetch = async (_input, init) => {
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.reply_to, valid.email);
      assert.equal(payload.text.includes(valid.message), true);
      return new Response(JSON.stringify({ id: "test-delivery-id" }), {
        status: 200,
      });
    };
    assert.equal((await POST(req(valid))).status, 200);
    global.fetch = async () => new Response("{}", { status: 500 });
    assert.equal((await POST(req(valid))).status, 502);
  } finally {
    global.fetch = saved;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  }
});

test("production requires trusted edge and shared protection, and uses atomic counters", async () => {
  const saved = global.fetch;
  const savedEnv = { ...process.env };
  Object.assign(process.env, {
    NODE_ENV: "production",
    RESEND_API_KEY: "test",
    CONTACT_TO_EMAIL: "to@example.org",
    CONTACT_FROM_EMAIL: "from@example.org",
    VERCEL: "1",
    UPSTASH_REDIS_REST_URL: "https://ratelimit.example.org",
    UPSTASH_REDIS_REST_TOKEN: "test",
  });
  function req() {
    return new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
        "content-type": "application/json",
        "x-vercel-forwarded-for": "192.0.2.1",
      },
      body: JSON.stringify({ ...valid, startedAt: Date.now() - 5000 }),
    });
  }
  try {
    global.fetch = async () => new Response("{}", { status: 503 });
    assert.equal((await POST(req())).status, 503);
    global.fetch = async () =>
      new Response(JSON.stringify({ result: 6 }), { status: 200 });
    assert.equal((await POST(req())).status, 429);
    let requests = 0;
    global.fetch = async (input, init) => {
      requests++;
      if (String(input).includes("ratelimit.example.org")) {
        const command = JSON.parse(String(init?.body));
        assert.equal(command[0], "EVAL");
        assert.match(command[1], /EXPIRE/);
        return new Response(JSON.stringify({ result: 1 }));
      }
      return new Response(JSON.stringify({ id: "test-delivery" }));
    };
    assert.equal((await POST(req())).status, 200);
    assert.equal(requests, 2);
  } finally {
    global.fetch = saved;
    for (const key of Object.keys(process.env))
      if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env, savedEnv);
  }
});
