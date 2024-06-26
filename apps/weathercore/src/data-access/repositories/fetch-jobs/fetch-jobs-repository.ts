import { eq } from "drizzle-orm";
import { fetchJobs } from "../../models/db/fetch-jobs";
import type { FetchJobs } from "../../models/types";
import { drizzleConnection } from "../connections";
import { createDbConnection } from "../../connections/connection.ts";

export const FetchJobsRepository = async (connectionString?: string) => {
  const dbConnection = createDbConnection(5, connectionString);
  const connection = drizzleConnection(fetchJobs, dbConnection);

  return {
    async findFetchJobsTaskById(
      id: Exclude<FetchJobs["id"], undefined | null>,
    ) {
      return await connection.query.schema.findFirst({
        where: eq(fetchJobs.id, id),
      });
    },
    async findFetchJobsTasksByTopic(
      fetch_job_type_id: Exclude<FetchJobs["topic"], undefined | null>,
    ) {
      return await connection.query.schema.findFirst({
        where: eq(fetchJobs.topic, fetch_job_type_id),
      });
    },
    async upsertFetchJobsTask(fetch_task: FetchJobs[]): Promise<FetchJobs[]> {
      return await connection.transaction(async (tx) => {
        return tx.insert(fetchJobs).values(fetch_task).returning();
      });
    },
    async deleteFetchJobsTask(): Promise<FetchJobs[]> {
      return connection.delete(fetchJobs);
    },
  };
};
