import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const uv = pgTable(
  "uv",
  {
    id: uuid("id").defaultRandom(),
    uv_index: integer("uv_index"),
    timestamp: varchar("timestamp"),
    update_timestamp: varchar("updated_timestamp"),
    date_created: timestamp("date_created").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.uv_index, table.timestamp] }),
    };
  },
);
