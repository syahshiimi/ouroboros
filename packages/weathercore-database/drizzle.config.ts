import type { Config } from "drizzle-kit";

export default {
  schema: "./src/models/db/",
  out: "./src/migrations/",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT!)
  },
  verbose: true,
} satisfies Config;
