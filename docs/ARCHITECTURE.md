# Architecture

## Why Nuxt

Nuxt 4 was selected as the framework for this project for the following reasons:

- **File-based routing** — pages map directly to URL structure with no additional configuration
- **SSR by default** — server-side rendering enables proper SEO without extra tooling
- **Vue 3 + TypeScript** — composable, strongly typed component model with first-class support
- **Auto-imports** — components, composables and utilities are available without manual imports
- **`useSeoMeta`** — native meta tag management without installing a separate SEO package
- **`@nuxt/image`** — production-quality image optimisation (WebP, AVIF, lazy loading, layout shift prevention) as a first-party module
- **Nuxt 4 `app/` directory** — clean separation between application code and configuration

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request to `main`:

1. Checkout
2. Node 22 setup with npm caching
3. `npm ci`
4. `npm run lint`
5. `npm run typecheck`
6. `npm run test` (Vitest unit tests)
7. `npm run build`

No production secrets are required in CI. Unit tests do not call MongoDB, Telegram or Turnstile.

---

## Testing

Unit tests live in `tests/` and are run with Vitest.

- `tests/contact-schema.test.ts` — validates the Zod contact schema: valid paths, all rejection cases, field length limits, privacy consent requirement, honeypot behaviour
- `tests/telegram-message.test.ts` — validates the Telegram message formatter: required fields, optional field omission, HTML injection prevention, no secrets (email, phone, ipHash) in the message

The test suite intentionally does not test MongoDB queries or external API calls. Those integrations are tested manually against a real environment.

---

## SEO Layer

- `useSeoMeta` on every page: `title`, `description`, `ogTitle`, `ogDescription`
- Canonical URL: emitted globally in `app/app.vue` when `NUXT_PUBLIC_SITE_URL` is set
- Sitemap: dynamic server route at `/sitemap.xml` generated from project/service data
- Structured data (JSON-LD):
  - `WebSite` schema on every page (via `app/app.vue`)
  - `BreadcrumbList` on `/proyectos/[slug]` and `/servicios/[slug]`
- Twitter card: `summary_large_image` set globally
- Default OG image: place `public/images/og/default.jpg` (1200×630 px) and uncomment the `og:image` line in `nuxt.config.ts`

---

## Application Structure

```
cesar-portfolio/
├── app/
│   ├── app.vue               Entry point. Renders NuxtLayout + NuxtPage.
│   ├── error.vue             Custom error page (404, 500).
│   ├── assets/css/
│   │   └── main.css          Design tokens (CSS variables) + global styles + Tailwind 4 import.
│   ├── components/
│   │   ├── home/             Page-section components used only on index.vue.
│   │   ├── layout/           SiteHeader, SiteFooter, MobileNavigation.
│   │   ├── project/          ProjectCard, ProjectGrid, ProjectMeta.
│   │   ├── service/          ServiceItem, ServiceList.
│   │   └── ui/               BaseButton (variants: primary, secondary, secondary-light, ghost).
│   ├── data/
│   │   ├── projects.ts       Sample project array + helper functions.
│   │   ├── services.ts       Service definitions + helper functions.
│   │   └── site.ts           Site-wide static content (name, contact, social, legal).
│   ├── layouts/
│   │   └── default.vue       Wraps every page: SiteHeader + main slot + SiteFooter.
│   ├── pages/
│   │   ├── index.vue
│   │   ├── contacto.vue      Full contact form with Turnstile, honeypot, UTM capture.
│   │   ├── privacidad.vue    Privacy policy page (TODO placeholders for legal text).
│   │   ├── energia-solar.vue
│   │   ├── estudio.vue
│   │   ├── proyectos/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   └── servicios/
│   │       ├── index.vue
│   │       └── [slug].vue
│   └── types/
│       ├── lead.ts           Lead interface for MongoDB storage.
│       ├── project.ts        Project interface + ProjectCategory union type.
│       └── service.ts        Service interface + ServiceCategory union type.
├── docs/
│   ├── ARCHITECTURE.md       ← this file
│   └── ROADMAP.md
├── server/
│   ├── api/
│   │   └── contact.post.ts   POST /api/contact — validates, rate-limits, saves, notifies.
│   ├── services/
│   │   ├── telegram.ts       Telegram Bot API notification.
│   │   └── turnstile.ts      Cloudflare Turnstile server-side verification.
│   └── utils/
│       ├── mongodb.ts        MongoDB connection singleton + index initialisation.
│       ├── rateLimit.ts      IP-hash-based rate limiting (5 req / 15 min via MongoDB).
│       └── request.ts        Client IP extraction + Origin validation.
├── shared/
│   └── schemas/
│       └── contact.ts        Zod schema shared between client and server validation.
├── public/
│   └── images/placeholders/  Static placeholder assets (to be replaced with real photography).
├── .env.example              Environment variable template.
├── eslint.config.mjs
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

---

## Data Layer

All content lives in `app/data/`. Each file exports a typed array and helper functions:

| File | Exports |
|------|---------|
| `projects.ts` | `projects`, `getProjectBySlug()`, `getFeaturedProjects()` |
| `services.ts` | `services`, `getServiceBySlug()`, `getFeaturedServices()` |
| `site.ts` | `site` (name, tagline, contact, social, legal) |

**The components never embed content directly.** They receive typed data as props or import from data files. This is a deliberate boundary: replacing these TypeScript arrays with CMS API calls should require zero changes to components.

---

## Component Conventions

- **No giant components.** Each section on the homepage is its own component in `app/components/home/`.
- **Props over stores.** No global state management (Pinia not installed). Data flows down via props.
- **`defineProps<T>()`** with TypeScript generics for all prop definitions.
- **`<style scoped>`** with BEM-influenced class naming per component.
- **No inline styles** — all values reference CSS custom properties.
- **Auto-imports** — components and composables require no `import` statements.

---

## Styling Approach

Tailwind CSS 4 is configured via the `@tailwindcss/vite` Vite plugin (not the legacy PostCSS approach). The entry point is `app/assets/css/main.css` which:

1. Imports Tailwind with `@import "tailwindcss"`
2. Defines CSS custom properties for all design tokens
3. Sets global base styles (reset, typography, focus states)
4. Provides utility classes: `.container`, `.container--wide`, `.section`, `.divider`

Tailwind utility classes are used sparingly — mainly for responsive layout. The majority of styling is done with scoped CSS using design token variables. This keeps components self-contained and the token system easy to update.

---

## SEO

- Global defaults configured in `nuxt.config.ts` via `app.head`
- Page-specific meta configured with `useSeoMeta()` in each page component
- Dynamic pages (`/proyectos/[slug]`, `/servicios/[slug]`) generate title and description from their data
- One `<h1>` per page, logical `<h2>`/`<h3>` hierarchy throughout
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- `lang="es"` set on `<html>`

---

## Contact API (Phase 4)

The contact form at `/contacto` submits to `POST /api/contact`. The endpoint:

1. Validates `Content-Type` and `Origin`
2. Parses the JSON body
3. Runs Zod validation (schema shared with the client at `shared/schemas/contact.ts`)
4. Checks the honeypot field (silent discard)
5. Verifies the Cloudflare Turnstile token
6. Checks rate limit: max 5 requests per IP hash per 15 minutes (MongoDB atomic upsert)
7. Saves the lead to the `leads` collection in MongoDB
8. Sends a Telegram bot notification (non-blocking; failure is recorded but does not affect the HTTP response)

**Collections used in MongoDB:**

| Collection | Purpose |
|---|---|
| `leads` | One document per contact form submission |
| `contact_rate_limits` | IP hash counters with TTL index for automatic expiry |

**Key environment variables** (see `.env.example`):
- `MONGODB_URI` — connection string
- `NUXT_TELEGRAM_BOT_TOKEN` + `NUXT_TELEGRAM_CHAT_ID` — Telegram notifications
- `NUXT_PUBLIC_TURNSTILE_SITE_KEY` + `NUXT_TURNSTILE_SECRET_KEY` — Cloudflare Turnstile
- `NUXT_RATE_LIMIT_SALT` — secret for IP hashing
- `NUXT_PUBLIC_SITE_URL` — used for Origin validation

---

## Current Limitations

- **No real content** — all project and service data is placeholder/illustrative
- **No real photography** — image containers use CSS placeholder blocks
- **No analytics** — GA4/GTM deferred to a later phase
- **No CMS** — deferred to a later phase
- **Privacy policy** — `/privacidad` contains structural placeholder text; real legal copy must be supplied before launch
- **`/aviso-legal`** — route not yet created

---

## Replacing Local Data with a CMS

The data layer is intentionally thin. To migrate to a CMS (Contentful, Sanity, Strapi, etc.):

1. Create composables `useProjects()` and `useServices()` that fetch from the CMS API
2. Replace the direct imports in page components with the new composables
3. The typed interfaces (`Project`, `Service`) define the contract — ensure the CMS schema matches them
4. Components require zero changes

---

## Introducing Backend Functionality

The application is currently fully static. To add backend capabilities:

- **Contact form** — add a Nuxt server route at `server/api/contact.post.ts`
- **Lead storage** — connect the server route to a database or CRM via environment variables
- **Authentication** — introduce `nuxt-auth-utils` or similar when a client portal is needed
- **CMS webhooks** — add revalidation endpoints if ISR is used with a headless CMS
