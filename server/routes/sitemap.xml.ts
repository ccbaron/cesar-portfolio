import { defineEventHandler, setHeader, getRequestHeader } from 'h3'
import { projects } from '~~/app/data/projects'
import { services } from '~~/app/data/services'

const staticRoutes = [
  '/',
  '/proyectos',
  '/servicios',
  '/energia-solar',
  '/estudio',
  '/contacto',
]

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  // Prefer the configured SITE_URL; fall back to request host so local dev works
  const siteUrl =
    config.public.siteUrl ||
    (() => {
      const host = getRequestHeader(event, 'host') || 'localhost:3000'
      const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http'
      return `${proto}://${host}`
    })()

  const dynamicRoutes = [
    ...projects.map((p) => `/proyectos/${p.slug}`),
    ...services.map((s) => `/servicios/${s.slug}`),
  ]

  const allRoutes = [...staticRoutes, ...dynamicRoutes]

  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n  </url>`).join('\n')}
</urlset>`
})
