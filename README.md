# César Barón — Professional Website

Professional website for architect César Barón. The site communicates three integrated disciplines:

**Arquitectura · Tecnología · Energía**

Architecture design, planimetry, topographic surveys, drone-based photogrammetry and solar energy solutions.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 (Vue 3) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Image optimisation | `@nuxt/image` |
| Linting | `@nuxt/eslint` |
| Testing | Vitest |
| Package manager | npm |
| Runtime | Node.js 22+ |

---

## Requirements

- Node.js 22 (use `nvm use` with the included `.nvmrc`)
- npm 10 or higher

---

## Getting started

```bash
nvm use          # selects Node 22 via .nvmrc
npm ci           # install exact dependency versions
cp .env.example .env   # configure environment variables
npm run dev      # starts dev server at http://localhost:3000
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint errors |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Before pushing

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

CI runs the same sequence automatically on push and pull requests.

---

## Environment variables

Copy `.env.example` to `.env` and fill in the required values. See the file for documentation on each variable.

Key variables:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `NUXT_TELEGRAM_BOT_TOKEN` | Telegram bot for lead notifications |
| `NUXT_TELEGRAM_CHAT_ID` | Telegram chat/channel for notifications |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key |
| `NUXT_TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `NUXT_RATE_LIMIT_SALT` | Secret for IP hashing (rate limiting) |
| `NUXT_PUBLIC_SITE_URL` | Canonical production URL — required for correct SEO canonical tags and sitemap URLs |

> **Important:** Set `NUXT_PUBLIC_SITE_URL` to the final production domain (e.g. `https://cesar-baron.com`). Without it, canonical URLs and the sitemap will be generated without an absolute base URL.

---

## Project structure

```
app/
├── app.vue                   Entry point — canonical URLs + WebSite structured data
├── error.vue                 Custom error page
├── assets/css/main.css       Design tokens + Tailwind 4 + global styles
├── components/
│   ├── home/                 Homepage section components
│   ├── layout/               SiteHeader, SiteFooter
│   ├── project/              ProjectCard, ProjectGrid, ProjectMeta
│   ├── service/              ServiceItem, ServiceList
│   └── ui/                   BaseButton
├── data/                     Typed static content (replace with CMS calls in Phase 3)
├── pages/                    File-based routing
└── types/                    TypeScript interfaces

server/
├── api/contact.post.ts       Contact form endpoint
├── routes/sitemap.xml.ts     Dynamic sitemap
├── services/                 Telegram + Turnstile integrations
└── utils/                    MongoDB, rate limiting, request helpers

shared/
└── schemas/contact.ts        Zod schema (used by both client and server)

tests/
├── contact-schema.test.ts    Contact form validation tests
└── telegram-message.test.ts  Telegram message formatting tests

.github/workflows/ci.yml      CI: lint → typecheck → test → build
public/images/og/             Place default.jpg (1200×630) here for OG image
```

---

## Contact form backend

The contact form at `/contacto` is fully wired:

- **Validation** — Zod schema, shared between client and server
- **Anti-spam** — Cloudflare Turnstile verification + honeypot field
- **Rate limiting** — 5 submissions per IP per 15 minutes (MongoDB)
- **Storage** — leads saved to MongoDB `leads` collection
- **Notifications** — Telegram bot message on each new lead
- **UTM attribution** — campaign source captured automatically

No email confirmation to the sender is sent yet (deferred).

---

## SEO

- `useSeoMeta` on every page with title, description, og:title, og:description
- Canonical URLs emitted automatically when `NUXT_PUBLIC_SITE_URL` is set
- Dynamic sitemap at `/sitemap.xml` (generated from project/service data)
- WebSite + BreadcrumbList JSON-LD structured data
- `twitter:card: summary_large_image` globally
- Default OG image: place `public/images/og/default.jpg` and uncomment the `og:image` line in `nuxt.config.ts`

---

## Current limitations

- All project and service data is **placeholder content**
- No real photography — image containers use CSS placeholder blocks
- Privacy policy (`/privacidad`) contains structural placeholder text — real legal copy required before launch
- `/aviso-legal` route not yet created
- No analytics (deferred)
- No CMS integration (deferred)

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased plan.


---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 (Vue 3) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Image optimisation | `@nuxt/image` |
| Linting | `@nuxt/eslint` |
| Testing | Vitest |
| Package manager | npm |
| Runtime | Node.js 22+ |
