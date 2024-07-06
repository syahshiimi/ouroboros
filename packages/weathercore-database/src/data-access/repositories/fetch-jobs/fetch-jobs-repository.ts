import { eq } from "drizzle-orm";
import { createRepositoryConnection } from "../../connection/connection.js";
import { fetchJobs } from "../../models/index.js";
import { InsertFetchJobs, SelectFetchJobs } from "../../models/types.js";

export const FetchJobsRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: fetchJobs,
  });

  return {
    async findFetchJobsTaskById(
      id: Exclude<SelectFetchJobs["id"], undefined | null>,
    ) {
      return await connection.query.schema.findFirst({
        where: eq(fetchJobs.id, id),
      });
    },
    async findFetchJobsTasksByTopic(
      fetch_job_type_id: Exclude<SelectFetchJobs["topic"], undefined | null>,
    ) {
      return await connection.query.schema.findFirst({
        where: eq(fetchJobs.topic, fetch_job_type_id),
      });
    },
    async upsertFetchJobsTask(
      fetch_task: InsertFetchJobs[],
    ): Promise<InsertFetchJobs[]> {
      return await connection.transaction(async (tx) => {
        return tx.insert(fetchJobs).values(fetch_task).returning();
      });
    },
    async deleteFetchJobsTask(): Promise<InsertFetchJobs[]> {
      return connection.delete(fetchJobs);
    },
  };
};
