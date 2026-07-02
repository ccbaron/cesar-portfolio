import { defineEventHandler, readBody, getRequestHeader, createError, setResponseStatus } from 'h3'
import { contactSchema } from '~~/shared/schemas/contact'
import { getDb } from '../utils/mongodb'
import { hashIp, checkRateLimit } from '../utils/rateLimit'
import { getClientIp, isOriginAllowed } from '../utils/request'
import { verifyTurnstile } from '../services/turnstile'
import { sendTelegramNotification } from '../services/telegram'
import type { Lead } from '~~/app/types/lead'

export default defineEventHandler(async (event) => {
  // 1. Validate Content-Type
  const contentType = getRequestHeader(event, 'content-type') ?? ''
  if (!contentType.includes('application/json')) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported Media Type' })
  }

  // 2. Validate Origin
  if (!isOriginAllowed(event)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  // 3. Parse body (H3 enforces a 1 MB default limit)
  const rawBody = await readBody(event)

  // 4. Zod validation
  const parsed = contactSchema.safeParse(rawBody)
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten().fieldErrors,
    })
  }

  const data = parsed.data

  // 5. Honeypot check (website field must be empty)
  if (data.website && data.website.length > 0) {
    // Return 200 to avoid leaking information to bots
    setResponseStatus(event, 200)
    return { success: true }
  }

  // 6. Rate limiting
  const clientIp = getClientIp(event)
  const ipHash = hashIp(clientIp)
  const { allowed } = await checkRateLimit(ipHash)

  if (!allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      message: 'Has enviado demasiadas solicitudes. Por favor espera 15 minutos antes de intentar de nuevo.',
    })
  }

  // 7. Turnstile verification
  const turnstileOk = await verifyTurnstile(data.turnstileToken, clientIp)
  if (!turnstileOk) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Turnstile verification failed',
      message: 'La verificación no fue válida. Por favor recarga la página e intenta de nuevo.',
    })
  }

  // 8. Save lead to MongoDB
  const db = await getDb()
  const userAgent = getRequestHeader(event, 'user-agent')

  const lead: Lead = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    location: data.location,
    message: data.message,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    utmTerm: data.utmTerm,
    pagePath: data.pagePath,
    referrer: data.referrer,
    ipHash,
    userAgent,
    createdAt: new Date(),
    notification: { telegram: 'skipped' },
  }

  const insertResult = await db.collection<Lead>('leads').insertOne(lead)

  // 9. Telegram notification (non-blocking; failure doesn't affect response)
  const telegramSent = await sendTelegramNotification(lead)
  await db.collection<Lead>('leads').updateOne(
    { _id: insertResult.insertedId },
    { $set: { 'notification.telegram': telegramSent ? 'sent' : 'failed' } },
  )

  return { success: true }
})
