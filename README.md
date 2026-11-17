# The Maverick Builder

A personal digital headquarters for engineering, independent thinking, and community opportunity. Next.js App Router, React, strict TypeScript, Tailwind CSS, MDX, Zod, Lucide, and Motion for React. Public pages render on the server; only interactive navigation, search, theme, sharing, and forms use client components. No message database, tracking scripts, remote fonts, or fabricated achievements.

## Run locally

Requires Node.js 22.13+ (validated with 24.22.1) and npm.

On your own computer, open a terminal in the cloned repository. For example, if you cloned it into your home directory:

```sh
cd ~/lou_portfolio_page
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser after the server reports ready. Environment variables are optional for browsing; copy `.env.example` to `.env.local` only if that file does not already exist and you want to configure integrations. Without email configuration, the contact form clearly displays an unavailable state. Production: `npm run build` then `npm start`.

### Recover from a failed installation on macOS

If npm reports `mkdir '/workspace'` or cannot write `/workspace/.npm-cache/_logs`, a cloud-only cache path was used on your computer. Stop any running installs or development servers with Ctrl+C, then run these commands one at a time:

```sh
cd ~/lou_portfolio_page
npm ci --cache "$HOME/.npm"
npm run dev
```

Run the last command only after installation succeeds. `npm ci` replaces the incomplete `node_modules` using the committed lockfile; it does not delete your source files. The explicit cache option overrides an incorrectly configured npm cache without changing your global settings. Do not delete `package-lock.json`, use `sudo`, or disable package verification. If installation still fails, inspect the first `npm error` and the log path npm reports.

### Managed cloud environment only

The paths below apply to Codex Cloud, not your Mac or PC. Use the existing checkout; cloud tasks are already isolated and do not need worktrees.

```sh
cd /workspace/lou_portfolio_page
npm ci --cache /workspace/.npm-cache
npm run dev
```

### Validation

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

Edit `src/lib/site.ts` for the public name, social links, navigation, career areas, milestones, projects, community initiatives, notebook entries, and the conceptual Resistance architecture. The shared photography system is configured in `src/lib/photography.ts`. Add your four actual WebP photographs under `public/images/profile/` and set descriptive alt text and desktop/mobile focal points. Missing images resolve to labeled abstract placeholders, never a generated likeness. See [Photography guide](docs/PHOTOGRAPHY.md). Person JSON-LD is intentionally omitted until `personName` is supplied. Social links are omitted until verified URLs are supplied. Keep URLs HTTPS.

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

## Cinematic experience

The homepage now follows five chapters, beginning with a midnight portrait-led hero. Mobile places the portrait first and uses `contain` to preserve the full photograph; desktop reserves 52% of the composition for imagery with configurable focal points. The chapter navigation pins on desktop without hijacking scrolling.

`src/components/motion.tsx` provides MotionConfig/LazyMotion, chapter reveals, staggered headline, magnetic CTAs, and page/article scroll progress. `motion-features.ts` lazily loads domMax for shared layout transitions (navigation, pipeline event, editorial filtering); there is no second animation library. `template.tsx` provides a short route entrance without exit delays. Server HTML is visible from the start. Reduced-motion preference removes entrance movement, magnetism, image scaling, and automatic event travel. Progress bars follow scroll directly; no spring lag. The portrait system uses optimized Next Image assets with explicit responsive sizes and only the hero is preloaded.

The Resistance explorer has Simple and Technical explanations and per-stage status; its complete text alternative works without JavaScript. Event playback is opt-in and fictional, may be paused/reset, and uses synthetic event `demo-001`. Reduced-motion mode provides a manual step button. No backend project services or live security data are connected.

Writing retains instant search/category filters and adds a featured selection that follows the filters, animated article layout, and an article-specific reading progress bar. Content authoring and publishing requirements remain unchanged.
