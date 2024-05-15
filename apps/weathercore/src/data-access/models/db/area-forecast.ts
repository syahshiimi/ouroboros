import { doublePrecision, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const areaForecast = pgTable('area_forecast', {
  id: uuid("id").defaultRandom(),
  area_name: varchar("area_name", { length: 40 }).primaryKey(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  date_created: timestamp("date_created").defaultNow()
})
