import { eq } from "drizzle-orm";
import { fetchJobs } from "../../models/db/fetch-jobs";
import type { FetchJobs } from "../../models/types";
import { drizzleConnection } from "../connections";

const connection = drizzleConnection(fetchJobs)

export async function findFetchJobsTaskById(
  id: Exclude<FetchJobs["id"], undefined | null>
) {
  return await connection.query.schema.findFirst({
    where: eq(fetchJobs.id, id)
  })
}

export async function findFetchJobsTaskByFetchJobsTypeId(
  fetch_job_type_id: Exclude<FetchJobs["fetch_job_type_id"], undefined | null>
) {
  return await connection.query.schema.findFirst({
    where: eq(fetchJobs.fetch_job_type_id, fetch_job_type_id)
  })
}

export async function updateFetchJobsTask(
  fetch_task: FetchJobs[]
): Promise<FetchJobs[]> {
  return await connection.insert(fetchJobs).values(fetch_task).returning()
}

