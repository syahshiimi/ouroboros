import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const uv = pgTable('uv', {
  id: uuid("id").defaultRandom().primaryKey(),
  uv_index: integer("uv_index"),
  timestamp: timestamp("timestamp"),
  date_created: timestamp("date_created").defaultNow()
})
