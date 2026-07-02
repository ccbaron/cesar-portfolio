import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

/**
 * Extract the real client IP from the request.
 * Trusts CF-Connecting-IP (Cloudflare) first, then X-Forwarded-For, then socket.
 */
export function getClientIp(event: H3Event): string {
  const cfIp = getRequestHeader(event, 'cf-connecting-ip')
  if (cfIp) return cfIp.trim()

  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first) return first.trim()
  }

  return event.node.req.socket?.remoteAddress ?? 'unknown'
}

/**
 * Validate that the request Origin matches the configured SITE_URL.
 * Returns true when in development (no restriction) or when origins match.
 */
export function isOriginAllowed(event: H3Event): boolean {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl

  // Skip origin check in development
  if (!siteUrl || siteUrl.startsWith('http://localhost')) {
    return true
  }

  const origin = getRequestHeader(event, 'origin') ?? ''
  try {
    const allowedOrigin = new URL(siteUrl).origin
    const requestOrigin = new URL(origin).origin
    return requestOrigin === allowedOrigin
  }
  catch {
    return false
  }
}
