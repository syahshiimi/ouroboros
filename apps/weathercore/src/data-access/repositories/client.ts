import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { createDbConnection } from "../connections/connection"

export const queryClient = <T extends Record<string, unknown>>(connections: number = 5, schema: T): PostgresJsDatabase<T> => {
  return drizzle(createDbConnection(connections), { schema })
}
