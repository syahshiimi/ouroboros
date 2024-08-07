import {
  uuid,
  varchar,
  timestamp,
  pgTable,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";
import { stations } from "./station.js";

export const humidity = pgTable(
  "humidity",
  {
    id: uuid("id").notNull().defaultRandom(),
    station_id: varchar("station_id", { length: 20 }).references(
      () => stations.station_id,
    ),
    timestamp: varchar("timestamp"),
    humidity_value: decimal("humidity_value"),
    date_created: timestamp("date_created").defaultNow(),
    file_name: varchar("file_name", { length: 256 }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id, table.timestamp, table.station_id],
      }),
    };
  },
);
