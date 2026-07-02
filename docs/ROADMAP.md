# Roadmap

## Phase 1 — Frontend Foundation ✅ Current

- Nuxt 4 + Vue 3 + TypeScript project scaffold
- Tailwind CSS 4 with design token system
- Layout: SiteHeader, SiteFooter, MobileNavigation
- All planned routes (`/`, `/proyectos`, `/proyectos/[slug]`, `/servicios`, `/servicios/[slug]`, `/energia-solar`, `/estudio`, `/contacto`)
- Typed `Project` and `Service` data models
- Sample placeholder data
- Reusable component architecture
- SEO foundation with `useSeoMeta`
- Contact form UI (not yet wired to backend)
- Custom 404 error page
- Documentation

---

## Phase 2 — Real Content & Photography

- Replace placeholder data in `app/data/projects.ts` and `app/data/services.ts` with real project information
- Supply and optimise real architectural photography, renders and drone imagery
- Add actual contact details to `app/data/site.ts`
- Provide César's biographical content for `/estudio`
- Provide brand copy review
- Add Instagram and LinkedIn links
- Create `/privacidad` and `/aviso-legal` legal pages

---

## Phase 3 — CMS Integration

- Select headless CMS (Sanity, Contentful, or Strapi recommended)
- Define CMS schema matching existing `Project` and `Service` TypeScript interfaces
- Create composables `useProjects()` and `useServices()` to replace local data arrays
- Configure incremental static regeneration (ISR) or on-demand revalidation
- Set up asset delivery through CMS CDN
- Add content preview mode for editorial workflow

---

## Phase 4 — Contact API & Lead Storage ✅ Complete

- ✅ Nuxt server route `server/api/contact.post.ts`
- ✅ MongoDB lead storage (`leads` collection)
- ✅ Zod validation shared between client and server
- ✅ Cloudflare Turnstile anti-spam verification
- ✅ Honeypot field
- ✅ IP-hash rate limiting (5 req / 15 min, MongoDB + TTL index)
- ✅ Telegram bot notification on new lead
- ✅ UTM attribution captured from URL parameters
- ✅ Privacy consent checkbox + `/privacidad` page (placeholder legal text)
- ✅ Security headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Dark visual sections (TerritorySection, ContactCTA, SiteFooter)
- ⬜ Confirmation email to the sender (deferred — requires email provider)

---

## Phase 5 — Analytics & Conversion Tracking

- Install Google Tag Manager via `@nuxtjs/gtm` or native script injection
- Configure GA4 property
- Define conversion events: contact form submission, CTA clicks
- Add cookie consent banner (required for GDPR)

---

## Phase 6 — SEO Expansion

- Install `@nuxtjs/sitemap` and generate `sitemap.xml`
- Add structured data (JSON-LD) for the organisation, services and projects
- Implement `robots.txt` controls for CMS preview environments
- Add canonical URLs
- Review and expand meta descriptions for all pages
- Assess Open Graph image generation for project and service pages

---

## Phase 7 — Client Portal (Optional)

- Evaluate need based on business growth
- Authentication with `nuxt-auth-utils` or Auth.js
- Secure project delivery area: plans, reports, renders per client
- Upload and download management
- Requires database and file storage infrastructure
