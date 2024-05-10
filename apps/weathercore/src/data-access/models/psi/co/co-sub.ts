import { integer, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { region } from "../../region";

export const o3sub = pgTable('o3_sub', {
  id: uuid("id").defaultRandom(),
  region_id: varchar("region_id", { length: 128 }).references(() => region.id),
  reading: integer("reading"),
  timestamp: timestamp("timestamp", { withTimezone: true }),
  date_created: timestamp("date_created").defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.region_id, table.timestamp] })
  }
})
