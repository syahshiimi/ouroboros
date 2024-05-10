import { decimal, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { stations } from "./station";

export const temperatureReadings = pgTable('temperature_readings', {
  id: uuid("id").defaultRandom(),
  station_id: varchar("station_id", { length: 20 }).references(() => stations.station_id),
  timestamp: timestamp("timestamp", { withTimezone: true }),
  reading: decimal("reading_value"),
  date_created: timestamp("date_created").defaultNow(),
  file_name: varchar("file_name", { length: 256 })
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.timestamp, table.station_id] })
  }
})
