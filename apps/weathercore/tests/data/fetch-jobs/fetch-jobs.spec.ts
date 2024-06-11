import { beforeAll, afterAll, describe, test, expect } from "bun:test";
import {
  deleteFetchJobsTask,
  findFetchJobsTasksByTopic,
  findFetchJobsTaskById,
  upsertFetchJobsTask,
} from "../../../src/data-access/repositories/fetch-jobs/fetch-jobs-repository";
import { sampleFetchJob } from "../../sample/samples";

beforeAll(async () => {});

afterAll(async () => {
  await deleteFetchJobsTask();
});

describe("fetch jobs task queue", async () => {
  test("should insert fetch jobs task", async () => {
    const addFetchJobs = await upsertFetchJobsTask([sampleFetchJob]);

    expect(addFetchJobs.length).toBe(1);
  });

  test("should find fetch job by id", async () => {
    const addFetchJobs = await upsertFetchJobsTask([sampleFetchJob]);
    expect(addFetchJobs.length).toBe(1);

    if (addFetchJobs[0]?.id) {
      const fetchJob = await findFetchJobsTaskById(addFetchJobs[0].id!);
      expect(fetchJob).not.toBeNaN();
      expect(fetchJob?.id).toBe(addFetchJobs[0].id!);
    }
  });

  test("should find fetch job by fetch job type id", async () => {
    const addFetchJobs = await upsertFetchJobsTask([sampleFetchJob]);
    expect(addFetchJobs.length).toBe(1);

    if (addFetchJobs[0]?.topic && sampleFetchJob.topic) {
      const fetchJobs = await findFetchJobsTasksByTopic(addFetchJobs[0].topic);
      expect(fetchJobs).not.toBeNaN();
      expect(fetchJobs?.topic).toBe(sampleFetchJob.topic);
    }
  });
});
