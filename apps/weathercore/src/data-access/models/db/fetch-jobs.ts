import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
export const tableTopics = pgEnum("topics", [
  "humidity",
  "rainfall",
  "uv",
  "temperature",
]);
export const fetchJobs = pgTable(
  "fetch_jobs_task",
  {
    id: uuid("id").defaultRandom().notNull(),
    topic: tableTopics("topics").notNull(),
    data_date: timestamp("data_date", { withTimezone: true }).notNull(),
    fetch_job_start_date: timestamp("fetch_job_start_date", {
      withTimezone: true,
    }).notNull(),
    fetch_url: varchar("fetch_url", { length: 256 }),
    file_name: varchar("file_name", { length: 256 }),
    workflow_id: varchar("workflow_id", { length: 256 }),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.topic] }),
    };
  },
);
