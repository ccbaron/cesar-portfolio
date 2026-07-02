import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'arquitectura',
  'remodelacion',
  'planimetria',
  'topografia',
  'dron',
  'modelado-3d',
  'energia-solar',
  'otro',
] as const

export type ServiceOption = (typeof SERVICE_OPTIONS)[number]

export const contactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto').max(100, 'Nombre demasiado largo').trim(),
  email: z.string().email('Correo electrónico inválido').max(254, 'Correo demasiado largo').trim().toLowerCase(),
  phone: z.string().max(30, 'Teléfono demasiado largo').trim().optional(),
  service: z.enum(SERVICE_OPTIONS, { error: 'Selecciona un servicio válido' }),
  location: z.string().max(120, 'Ubicación demasiado larga').trim().optional(),
  message: z.string().min(10, 'Mensaje demasiado corto').max(3000, 'Mensaje demasiado largo').trim(),
  privacyConsent: z.literal(true, { error: 'Debes aceptar la política de privacidad' }),

  // Honeypot — must be empty; validated server-side
  website: z.string().max(0).optional(),

  // UTM attribution
  utmSource: z.string().max(100).trim().optional(),
  utmMedium: z.string().max(100).trim().optional(),
  utmCampaign: z.string().max(100).trim().optional(),
  utmContent: z.string().max(100).trim().optional(),
  utmTerm: z.string().max(100).trim().optional(),

  // Context
  pagePath: z.string().max(500).trim().optional(),
  referrer: z.string().max(500).trim().optional(),

  // Cloudflare Turnstile token
  turnstileToken: z.string().min(1, 'Verificación requerida').max(2048),
})

export type ContactPayload = z.infer<typeof contactSchema>
