import type { Config } from 'drizzle-kit'

export default {
  schema: "./src/data-access/models/db",
  out: "./src/data-access/migrations/",
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
  }
} satisfies Config
