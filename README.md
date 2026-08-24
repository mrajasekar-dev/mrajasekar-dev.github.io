# Rajasekar M — Salesforce Principal Consultant

Marketing/consulting website for an independent, founder-led Salesforce
consulting practice. Statically exported and hosted on GitHub Pages at
https://mrajasekar-dev.github.io.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4, built as a fully
  static export (`output: "export"` in `next.config.ts`) — no server, no
  Server Actions, no Next image optimizer.
- shadcn/ui (Radix base, Nova preset) + lucide-react icons
- Geist Sans / Geist Mono, self-hosted via the `geist` package
- zod for client-side form validation

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm lint              # eslint
pnpm exec tsc --noEmit # typecheck
pnpm build             # static export -> ./out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes `./out` to GitHub Pages via GitHub Actions. No
manual build/deploy step needed. `public/.nojekyll` is required for GitHub
Pages to serve the `_next/` asset folder as-is (Jekyll ignores
underscore-prefixed paths by default).

## Structure

```
src/app            routes (/, /services, /how-i-work, /about, /contact, /privacy, /terms)
src/app/layout.tsx fonts, metadata, JSON-LD, Navbar/Footer
src/app/sitemap.ts / robots.ts
src/components      Navbar, Footer, Hero, SectionHeader, ServiceStage, Principle,
                     ContactForm, CTASection, Reveal (scroll-in), UxComparison
src/components/ui    shadcn primitives
src/content          all page copy (home, services, methodology, about) — sourced
                     from the founder's actual resume/background, no fabricated
                     clients, testimonials, or stats
src/config/site.ts   single source of truth for name/title/email/LinkedIn/nav —
                     rebranding later is a config change, not a redesign
src/lib/validations.ts  zod schema, validated client-side in ContactForm
```

## Contact form

Fully static-compatible: validates client-side, then builds a `mailto:` link
pre-filled with the submitted details and hands off to the visitor's own
email client. Nothing is transmitted to or stored on a server — there isn't
one.

## Placeholders / follow-ups for the founder

- **Custom domain**: currently served at `mrajasekar-dev.github.io`. If a
  custom domain is added later via GitHub Pages settings, update
  `src/config/site.ts`'s `url` to match.
- **Analytics**: none currently — GitHub Pages has no built-in analytics, and
  the previous Vercel Analytics integration only works when hosted on
  Vercel. If traffic data is wanted, a static-friendly option (e.g. Plausible,
  Umami, or GoatCounter) can be added later once an account/tracking ID
  exists.
- **Deliberately not built yet**: case studies, testimonials, client logos,
  pricing, and awards — the brief this site was built from is explicit that
  none of these should be fabricated. `CaseStudyCard`-style content can be
  added later once real, evidenced project outcomes exist.
