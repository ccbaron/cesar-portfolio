import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/image', '@nuxt/eslint'],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    quality: 85,
    format: ['webp', 'avif'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s | César Barón',
      meta: [
        {
          name: 'description',
          content:
            'Arquitectura, topografía, levantamientos con dron, modelado y soluciones de energía solar para proyectos residenciales y comerciales.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_CO' },
        { property: 'og:site_name', content: 'César Barón' },
        // og:image — add once public/images/og/default.jpg (1200×630 px) is supplied
        // { property: 'og:image', content: '/images/og/default.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  runtimeConfig: {
    // Server-only secrets — set via environment variables, never exposed to the client
    mongodbUri: '',
    mongodbDatabase: 'cesar_portfolio',
    telegramBotToken: '',
    telegramChatId: '',
    turnstileSecretKey: '',
    rateLimitSalt: '',
    public: {
      // Exposed to the client
      turnstileSiteKey: '',
      siteUrl: '',
    },
  },

  routeRules: {
    // Security headers for all API routes
    '/api/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Frame-Options': 'DENY',
      },
    },
  },

  nitro: {
    routeRules: {
      // Apply security headers to all pages
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          // Turnstile requires challenges.cloudflare.com in CSP
          'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
            "frame-src https://challenges.cloudflare.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "connect-src 'self'",
            "font-src 'self'",
          ].join('; '),
        },
      },
    },
  },

  typescript: {
    strict: true,
  },
})

