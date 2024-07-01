import { drizzle } from "drizzle-orm/postgres-js";
import type { PgTable } from "drizzle-orm/pg-core";
import postgres from "postgres";

export function drizzleConnection<T extends PgTable>(
  schema: T,
  connection: postgres.Sql,
) {
  return drizzle(connection, { schema: { schema } });
}
