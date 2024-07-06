import {
  doublePrecision,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const region = pgTable("region", {
  id: uuid("id").notNull().defaultRandom(),
  region_name: varchar("region_name").primaryKey(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  date_created: timestamp("date_created").defaultNow(),
});
