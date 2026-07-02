import { createHash } from 'node:crypto'
import { getDb } from './mongodb'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export function hashIp(ip: string): string {
  const config = useRuntimeConfig()
  const salt = config.rateLimitSalt || ''
  return createHash('sha256').update(salt + ip).digest('hex')
}

export async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean; remaining: number }> {
  const db = await getDb()
  const collection = db.collection('contact_rate_limits')
  const now = new Date()
  const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS)

  const result = await collection.findOneAndUpdate(
    { ipHash },
    {
      $inc: { count: 1 },
      $setOnInsert: { resetAt },
    },
    {
      upsert: true,
      returnDocument: 'after',
    },
  )

  const doc = result
  const count = doc?.count ?? 1
  const allowed = count <= RATE_LIMIT_MAX
  const remaining = Math.max(0, RATE_LIMIT_MAX - count)

  return { allowed, remaining }
}
