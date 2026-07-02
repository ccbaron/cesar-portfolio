import { MongoClient, type Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null
let indexesInitialized = false

export async function getDb(): Promise<Db> {
  const config = useRuntimeConfig()
  const uri = config.mongodbUri
  const dbName = config.mongodbDatabase || 'cesar_portfolio'

  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10_000,
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 30_000,
    })
    await client.connect()
  }

  if (!db) {
    db = client.db(dbName)
  }

  if (!indexesInitialized) {
    await ensureIndexes(db)
    indexesInitialized = true
  }

  return db
}

async function ensureIndexes(database: Db): Promise<void> {
  // Leads: index for queries by email and date
  await database.collection('leads').createIndexes([
    { key: { createdAt: -1 } },
    { key: { email: 1 } },
  ])

  // Rate limits: index for lookup and TTL expiry
  await database.collection('contact_rate_limits').createIndexes([
    { key: { ipHash: 1 }, unique: true },
    { key: { resetAt: 1 }, expireAfterSeconds: 0 },
  ])
}
