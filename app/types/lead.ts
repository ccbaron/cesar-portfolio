import type { ObjectId } from 'mongodb'

export type TelegramStatus = 'sent' | 'failed' | 'skipped'

export interface Lead {
  _id?: ObjectId
  name: string
  email: string
  phone?: string
  service: string
  location?: string
  message: string

  // Attribution
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  pagePath?: string
  referrer?: string

  // Request metadata
  ipHash: string
  userAgent?: string
  createdAt: Date

  // Notifications
  notification: {
    telegram: TelegramStatus
  }
}
