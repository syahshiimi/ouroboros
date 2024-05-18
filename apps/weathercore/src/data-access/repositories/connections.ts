import { drizzle } from "drizzle-orm/postgres-js"
import { createDbConnection } from "../connections/connection"
import type { PgTableWithColumns } from "drizzle-orm/pg-core"

const dbConnection = createDbConnection(5)

export function drizzleConnection<T extends PgTableWithColumns<any>>(schema: T) {
  return drizzle(dbConnection, { schema: { schema } })
}
