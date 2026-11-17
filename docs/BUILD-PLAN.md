# The Maverick Builder

## Product requirements

A personal digital headquarters connecting cybersecurity engineering, independent thinking, AI governance, and community opportunity. Serve technical peers, prospective collaborators, and nontechnical readers. Never imply unverified accomplishments, shipped capabilities, or launched initiatives. Required: all public routes, honest empty states, MDX publication, search/filter, secure configurable contact delivery, SEO, responsive accessibility, and automated verification.

## Sitemap and content model

- `/`: identity, four pillars, flagship work, demonstration reading, community philosophy, invitation.
- `/about`: story, editable career areas and empty milestones.
- `/writing`, `/writing/[slug]`: The Builders' Voice; MDX articles with title, summary, ISO date, category, tags, featured, demo, optional series/external URL. Reading time computed from source.
- `/work`, `/work/the-resistance`: typed project records and MDX project narrative. Data-driven conceptual architecture and explicit status.
- `/impact`: philosophy and typed initiative records (mission, location, status, description, outcomes, images, related writing, participation).
- `/ideas`: short notebook records distinct from articles.
- `/contact`: six inquiry categories; Zod validation, honeypot, minimum elapsed time, bounded rate limiting, configurable Resend delivery.
- RSS, sitemap, robots, generated social image.

## Visual direction

Luxury editorial meets architectural technology journal. Midnight/off-white surfaces, cobalt signature, selective amber status marks. Bold sans headlines, serif essays, fine rules, numbered sections, generous space. Abstract architectural linework stands in for a portrait until an owner-supplied photo exists. No fabricated likeness. Light/dark preference, reduced motion, visible keyboard focus.

## Component architecture

Server-rendered routes and shared shell; typed site/project/initiative/notebook configuration; filesystem content adapter with Zod frontmatter; reusable section heading, article cards, MDX primitives, status badges. Small client islands for theme/navigation, writing search, share, and contact form. No database. Content adapter is the future CMS boundary.

## Milestones

1. Foundation: Next App Router, strict TS, Tailwind, tokens, responsive shell, content schemas.
2. Core pages: identity and substantive flagship work; editable empty community and milestone data.
3. Publishing: MDX, code highlighting, categories/search, related content, sharing, RSS, SEO.
4. Validation: lint, types, unit and route/browser checks, production build, accessibility and responsive smoke checks. Document deployment and unresolved owner configuration.

## Required owner inputs

Name, portrait, canonical domain, optional biography/career details and social profiles, real articles, verified project implementation status, email provider key/recipient/sender. Until supplied, use brand identity and explicit placeholders. Never invent results.

## Cinematic experience revision

Photography is a primary layout element: hero (50% desktop composition, portrait first on mobile), story, publication, and community images use a shared responsive asset model. Required photographs: public/images/profile/{hero,about,editorial,community}.webp. Missing assets resolve to clearly labeled abstract placeholders, never a fabricated likeness. Desktop/mobile focal points and alt text are editable independently.

Motion architecture: Motion for React only, with LazyMotion loading domMax on demand for shared layout transitions. Reusable chapter reveals, staggered headline, magnetic CTAs, route entrance, reading/page progress, and navigation indicator. Server HTML remains visible; reduced-motion users receive immediate states, no parallax, and no moving demonstration event. No WebGL, scroll hijacking, mandatory animation wait, or second animation library.

Chapters: Who I Am → What I Believe → What I'm Building → What I'm Thinking → What I'm Working to Change. A sticky chapter rail is limited to desktop. The hero uses a full-viewport midnight composition and layered cobalt aperture motif. Images respond subtly to hover.

Resistance: keyboard-selectable stages, Simple/Technical views, explicit per-stage roadmap status, opt-in fictional event playback, pause/reset, live updates only for manually selected detail. Static text alternative exposes every stage without JavaScript. Editorial: animated filter layouts, featured selection, reading-specific progress and server-rendered related articles.

Validation: production build, existing regression tests, architecture controls/keyboard, reduced motion, JavaScript-disabled content, narrow/mobile/tablet layouts, light/dark axe checks. Validate image optimizer using an abstract placeholder fixture, never a synthetic portrait. Actual photo cropping remains subject to owner asset review.
