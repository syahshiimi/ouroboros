import { decimal, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

export const uv = pgTable('uv', {
  id: uuid("id").defaultRandom(),
  uv_index: decimal("uv_index"),
  timestamp: timestamp("timestamp"),
  date_created: timestamp("date_created").defaultNow()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.timestamp, table.uv_index] })
  }
})
