import { beforeAll, afterAll, describe, test, expect } from "bun:test";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { sampleFetchJob } from "../../sample/samples.js";
import { FetchService } from "../../../src/data-access/service/fetch-jobs/fetch-jobs-service.js"

describe("upsert fetch jobs table", async () => {
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
  let fetchJobsService: typeof FetchService;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    client = postgres({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    // do migration
    const sql = drizzle(client);

    await migrate(sql, {
      migrationsFolder: "src/data-access/migrations",
    });

    // Instantiate the service here.
    fetchJobsService = FetchService;
  });

  afterAll(async () => {
    await fetchJobsService.deleteFetchJobsRecords()
    await container.stop();
  });

  test("should insert fetch jobs task", async () => {
    const addFetchJobs = await fetchJobsService.addOrUpdateFetchJobs([
      sampleFetchJob,
    ]);

    expect(addFetchJobs.length).toBe(1);
  });

  test("should find fetch job by id", async () => {
    const addFetchJobs = await fetchJobsService.addOrUpdateFetchJobs([
      sampleFetchJob,
    ]);
    expect(addFetchJobs.length).toBe(1);

    if (addFetchJobs[0]?.id) {
      const fetchJob = await fetchJobsService.findFetchJobsById(
        addFetchJobs[0].id!,
      );
      expect(fetchJob).not.toBeNaN();
      expect(fetchJob?.id).toBe(addFetchJobs[0].id!);
    }
  });

  test("should find fetch job by topic", async () => {
    const addFetchJobs = await fetchJobsService.addOrUpdateFetchJobs([
      sampleFetchJob,
    ]);
    expect(addFetchJobs.length).toBe(1);

    if (addFetchJobs[0]?.topic && sampleFetchJob.topic) {
      const fetchJobs = await fetchJobsService.findFetchJobsByTopic(
        addFetchJobs[0].topic,
      );
      expect(fetchJobs).not.toBeNaN();
      expect(fetchJobs?.topic).toBe(sampleFetchJob.topic);
    }
  });
});
