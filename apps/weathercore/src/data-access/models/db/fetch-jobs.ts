import { pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const fetchJobs = pgTable('fetch_jobs_task', {
  id: uuid('id'),
  fetch_date: timestamp('fetch_date', { withTimezone: true }),
  fetch_job_start_date: timestamp('fetch_job_start_date', { withTimezone: true }),
  fetch_url: varchar('fetch_url', { length: 256 }),
  file_path: varchar('file_path', { length: 256 }),
  file_name: varchar('file_name', { length: 256 }),
  created_at: timestamp('created_at').defaultNow()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.file_name] })
  }
})
