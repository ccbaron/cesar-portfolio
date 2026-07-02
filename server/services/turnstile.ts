/**
 * Verify a Cloudflare Turnstile token server-side.
 * In development with no secret key configured, verification is skipped.
 */
export async function verifyTurnstile(token: string, remoteIp?: string): Promise<boolean> {
  const config = useRuntimeConfig()
  const secretKey = config.turnstileSecretKey

  // Skip verification in dev when no key is configured
  if (!secretKey) {
    return true
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  })
  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  try {
    const response = await $fetch<{ success: boolean }>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: body.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return response.success === true
  }
  catch {
    // Network errors — fail closed for security
    return false
  }
}
