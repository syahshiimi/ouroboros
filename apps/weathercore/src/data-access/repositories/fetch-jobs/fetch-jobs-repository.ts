import { eq } from "drizzle-orm";
import { fetchJobs } from "../../models/db/fetch-jobs";
import type { FetchJobs } from "../../models/types";
import { drizzleConnection } from "../connections";

const connection = drizzleConnection(fetchJobs);

export async function findFetchJobsTaskById(
  id: Exclude<FetchJobs["id"], undefined | null>,
) {
  return await connection.query.schema.findFirst({
    where: eq(fetchJobs.id, id),
  });
}

export async function findFetchJobsTasksByTopic(
  fetch_job_type_id: Exclude<FetchJobs["topic"], undefined | null>,
) {
  return await connection.query.schema.findFirst({
    where: eq(fetchJobs.topic, fetch_job_type_id),
  });
}

export async function upsertFetchJobsTask(
  fetch_task: FetchJobs[],
): Promise<FetchJobs[]> {
  return await connection.transaction(async (tx) => {
    return tx.insert(fetchJobs).values(fetch_task).returning();
  });
}

export async function deleteFetchJobsTask(): Promise<FetchJobs[]> {
  return connection.delete(fetchJobs);
}
