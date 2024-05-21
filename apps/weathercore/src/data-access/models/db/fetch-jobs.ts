import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { humidity } from "./humidity";
import { rainfall } from "./rainfall";
import { temperature } from "./temperature";
import { uv } from "./uv";


export const fetchJobs = pgTable('fetch_jobs_task', {
  id: uuid('id').defaultRandom(),
  fetch_job_type_id: varchar('fetch_job_type_id', { length: 256 }),
  fetch_date: timestamp('fetch_date', { withTimezone: true }),
  fetch_job_start_date: timestamp('fetch_job_start_date', { withTimezone: true }),
  fetch_url: varchar('fetch_url', { length: 256 }),
  file_name: varchar('file_name', { length: 256 }),
  workflow_id: varchar('workflow_id', { length: 256 }),
  created_at: timestamp('created_at').defaultNow()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id] })
  }
})

/**
 * Declare one-to-many relations here for the fetch jobs task table.
 *
 * A fetch jobs task can have relations to many other records in other tables.
 * We reference those id's in the fetch_jobs_type_id.
 *
**/
export const fetchJobRelations = relations(fetchJobs, ({ one }) => ({
  humidity_fetch_task: one(humidity, {
    fields: [fetchJobs.fetch_job_type_id],
    references: [humidity.id]
  }),
  rainfall_fetch_task: one(rainfall, {
    fields: [fetchJobs.fetch_job_type_id],
    references: [rainfall.id]
  }),
  temperature_fetch_task: one(temperature, {
    fields: [fetchJobs.fetch_job_type_id],
    references: [temperature.id]
  }),
  uv_fetch_task: one(uv, {
    fields: [fetchJobs.fetch_job_type_id],
    references: [uv.id]
  })
}))

