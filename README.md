# The Maverick Builder

A personal digital headquarters for engineering, independent thinking, and community opportunity. Next.js App Router, React, strict TypeScript, Tailwind CSS, MDX, Zod, and Lucide. Public pages render on the server; only interactive navigation, search, theme, sharing, and forms use client components. No message database, tracking scripts, remote fonts, or fabricated achievements.

## Run locally

Requires Node.js 22.13+ (validated with 24.22.1) and npm. Use the existing checkout; cloud tasks are already isolated and do not need worktrees.

```sh
cd /workspace/lou_portfolio_page
npm ci --cache /workspace/.npm-cache
cp .env.example .env.local
npm run dev
```

For a regular local clone, omit the custom cache path. Development listens on port 3000. Production: `npm run build` then `npm start`. No credentials are needed to browse the website. Without email configuration, the contact form clearly displays an unavailable state.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

In this cloud image, Chromium is already installed; use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Browser tests start the production server automatically and cover required routes, search/filtering, MDX code and tables, demo feed exclusion, metadata, mobile navigation/overflow, theme persistence, setup-state contact behavior, and automated WCAG checks. Axe is useful automated coverage, not a complete WCAG certification; perform screen-reader and human usability review before launch. Unit tests cover schemas, rate limiting, spam checks, origin checks, mocked email success/failure, and publication boundaries.

## Content and identity

Edit `src/lib/site.ts` for the public name, local portrait asset and alt text, social links, navigation, career areas, milestones, projects, community initiatives, notebook entries, and the conceptual Resistance architecture. Add real photographs under `public/` and set `site.portrait`; the current abstract composition is explicitly a portrait placeholder, never a generated likeness. Person JSON-LD is intentionally omitted until `personName` is supplied. Social links are omitted until verified URLs are supplied. Keep URLs HTTPS.

Career data currently lists only the professional areas supplied in the brief. Add verified dates and employers if desired; never infer accomplishments. Add milestone objects `{ title, date, description }` for confirmed speaking/publication details.

### Publish an article

Add `content/writing/your-clean-slug.mdx`:

```mdx
---
title: "Your article title"
summary: "A concise, accurate summary."
date: "2026-11-17"
category: "Engineering"
tags: ["Cloud", "Security"]
featured: true
demo: false
series: "Optional series name"
---

## Your first section

Your article text.
```

Categories: Engineering; Artificial Intelligence; Policy and Society; The Maverick Perspective; Community and Opportunity. Zod validates frontmatter. Reading time is computed at 220 words/minute, rounded up. Markdown supports highlighted fenced code, tables, lists, and blockquotes. MDX is executable trusted author content: never render untrusted user uploads as MDX. Deploy a new build for local content changes. Articles get canonical metadata, social previews, sharing, tags, related articles, and (when real) BlogPosting JSON-LD. Optional `externalUrl: "https://..."` creates an external reading destination.

All three initial articles have `demo: true`, visible demonstration notices, and `noindex`. They are omitted from RSS and sitemap. Delete them when real writing is ready. Homepage featured articles come from the `featured` flag; the publication notice adapts when real content exists. The first real local article automatically appears in RSS and sitemap. `GET /feed.xml` is an RSS 2.0 summary feed.

### External publication links without a new build

Set `PUBLICATIONS_FEED_URL` to an owner-controlled HTTPS JSON endpoint. `/writing` loads and validates its records at runtime with a five-minute cache. Update the remote JSON to add links without rebuilding. Each record uses the article fields above plus `slug`, HTTPS `externalUrl`, and `readingMinutes` (1–240); the endpoint returns an array of at most 100 records. `demo` defaults false. Failure produces a visible notice while local writing stays available. Remote records link directly to their original publication; only local published articles appear in this site's RSS/sitemap to avoid republishing unowned content. Setting/changing the environment variable itself may require a Vercel redeploy.

### Projects and The Resistance

Project cards are data records in `site.ts`. Update the flagship narrative in `content/projects/the-resistance.mdx`; update architecture stage records and status cards separately as verified facts become available. The page explicitly distinguishes unverified implementation, owner-described development streams, and planned capabilities. Additional projects can reuse the data model and shared components; add a corresponding route when a substantive project page is ready. Never publish confidential employer information or private code.

### Community initiatives

Add records to `initiatives` in `site.ts`, validated by `initiativeSchema`:

```ts
{ name: 'Verified initiative name', mission: 'Purpose', location: 'Location',
  status: 'Exploring', description: 'Accurate description', outcomes: [],
  images: [], relatedWriting: [], participate: 'How to get involved' }
```

Statuses: Exploring, In development, Active, Completed. Image records are `{src, alt}` using local assets; relatedWriting contains local article slugs. Only add substantiated outcomes. The page initially displays an honest empty state. Notebook records in `ideas` use `{title,date,kind,body}` and remain distinct from long-form articles.

## Contact delivery and privacy

Configure server-side variables in `.env.local` or your deployment provider. Never commit secret values or use `NEXT_PUBLIC_` for credentials.

- `SITE_URL`: exact public HTTPS origin for canonical metadata and contact same-origin validation. Set **before building**; metadata, RSS, sitemap, and article pages use build-time values.
- `RESEND_API_KEY`: email API credential.
- `CONTACT_FROM_EMAIL`: sender on a Resend-verified domain.
- `CONTACT_TO_EMAIL`: owner-controlled destination.
- Production on Vercel: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for shared abuse counters. `VERCEL=1` is supplied by Vercel; do not manually set it on an untrusted hosting stack.

The initial site uses no content/message database. A production shared Redis counter is justified solely for rate limiting across serverless instances: five attempts per network address per ten minutes, atomic increment/expiry. Development uses a bounded in-memory counter. Production delivery fails closed unless email, shared rate limiting, and the trusted Vercel edge are configured. For another host, implement and test its trusted-client-address adapter before enabling production contact. The edge-overwritten `x-vercel-forwarded-for` header is used only on Vercel; arbitrary `X-Forwarded-For` is never trusted.

The endpoint enforces same-origin JSON requests, a 16 KB streaming size limit, strict server validation, a honeypot, elapsed-time check, and provider timeouts. No user input is inserted into HTML email. Delivery is only confirmed after a successful provider response containing a delivery ID. Upstream acceptance does not guarantee inbox placement. API keys, messages, and email addresses are not logged. Missing configuration gives HTTP 503 and an explicit setup state. Unit tests use a mocked provider; live delivery requires owner credentials and a verified domain and has not been tested by default.

Before launch, update the contact privacy section with the owner's identity, privacy contact, and real retention practices. Resend, Upstash, and the recipient mailbox have their own processing/retention policies. For higher spam exposure, add a server-verified bot challenge. Avoid adding trackers without a privacy assessment.

## Deployment and security

Import this repository into Vercel, select Next.js, and configure variables. Use `npm ci` and `npm run build`. Set `SITE_URL` to the real domain, configure verified email delivery and shared rate limiting if needed, and redeploy. No production deployment has been performed by this implementation.

Security headers include CSP, frame denial, nosniff, referrer policy, and restricted browser capabilities. CSP allows inline scripts/styles for Next hydration and initial theme application; further hardening with nonces is a future task and requires dynamic-rendering tradeoffs. Add HSTS at your HTTPS host. MDX should only come from trusted repository authors. Package-lock is committed for reproducible installs; run `npm audit` periodically.

If cloud egress is restricted, package installation needs registry.npmjs.org (already in package-manager presets). Live email needs api.resend.com; shared rate limiting needs your exact Upstash hostname; optional external publication feeds need their configured hostname. Add these through environment settings when enabling those integrations. Do not put credentials in URLs or source files.

## Before a public launch

Provide the real name, domain, portrait, verified social links, final biography, real writing, and confirmed project statuses. Review the content and privacy policy. Configure and test a real email delivery end to end. Verify keyboard/screen-reader usability and actual-device behavior; measure Core Web Vitals on the deployed origin. Optional future work: article-specific social images, CMS adapter, bot challenge, paginated archives, richer project MDX records, and editorial image assets. The application is deployable; identity, publication, contact provisioning, and production delivery verification remain owner configuration.

The product requirements, sitemap, design direction, component model, and implementation milestones are in `docs/BUILD-PLAN.md`.
