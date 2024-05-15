import { doublePrecision, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const stations = pgTable('stations', {
  id: uuid("id").defaultRandom(),
  station_id: varchar("station_id", { length: 20 }).primaryKey(),
  location_name: varchar("location_name", { length: 256 }),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  date_created: timestamp('date_created').defaultNow()
})

