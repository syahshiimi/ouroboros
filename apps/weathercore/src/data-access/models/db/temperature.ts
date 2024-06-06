import { decimal, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { stations } from "./station";

export const temperature = pgTable('temperature', {
  id: uuid("id").defaultRandom(),
  station_id: varchar("station_id", { length: 20 }).references(() => stations.station_id),
  timestamp: varchar('timestamp'),
  reading: decimal("reading_value"),
  date_created: timestamp("date_created").defaultNow(),
  file_name: varchar("file_name", { length: 256 })
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.timestamp, table.station_id] })
  }
})

