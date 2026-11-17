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
