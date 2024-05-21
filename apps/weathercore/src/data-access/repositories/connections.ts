import { drizzle } from "drizzle-orm/postgres-js"
import { createDbConnection } from "../connections/connection"
import type { PgTable } from "drizzle-orm/pg-core"

const dbConnection = createDbConnection(5)

export function drizzleConnection<T extends PgTable>(schema: T) {
  return drizzle(dbConnection, { schema: { schema } })
}
