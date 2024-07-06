import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { exitDbConnection } from "../../../src/index.js";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { sampleStations, sampleUv } from "../../sample/samples.js";
import { StationsRepository, UVRepository } from "../../../src/repository.js";

describe("uv readings", () => {
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
  let uvService: Awaited<ReturnType<typeof UVRepository>>;
  let stationService: Awaited<ReturnType<typeof StationsRepository>>;

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

    // instantiate humidity service
    uvService = await UVRepository(container.getConnectionUri());

    // Instantiate the service here.
    stationService = await StationsRepository(container.getConnectionUri());

    // Insert the station details before test.
    await stationService.upsertStationDetails(sampleStations);
  });

  afterAll(async () => {
    await uvService.deleteAllUvReadings();
    await stationService.deleteAllStations();

    await exitDbConnection();

    await container.stop();
  });
  test("should upsert records into the database", async () => {
    const addRecords = await uvService.upsertUvReading(sampleUv);

    expect(addRecords.length).toBe(sampleUv.length);
  });

  test("should find latest uv reading by id", async () => {
    const addRecords = await uvService.upsertUvReading(sampleUv.slice(-1));
    expect(addRecords.length).toBe(1);

    if (addRecords[0]?.id) {
      const findRecord = await uvService.findLatestUvReadingById(
        addRecords[0].id,
      );
      expect(findRecord?.id).toBe(addRecords[0]?.id);
    }
  });

  test("should delete uv readings by id", async () => {
    const addRecords = await uvService.upsertUvReading(sampleUv.slice(-1));
    expect(addRecords.length).toBe(1);

    if (addRecords[0]?.id) {
      const deleteRecord = await uvService.deleteUvReadingById(
        addRecords[0].id!,
      );
      expect(deleteRecord).not.toBeNaN();
      expect(deleteRecord?.id).toBe(addRecords[0].id);
    }
  });

  test("should delete all uv readings", async () => {
    const deletedRecords = await uvService.deleteAllUvReadings();

    expect(deletedRecords.length - 1).toBe(sampleUv.length);
  });
});
