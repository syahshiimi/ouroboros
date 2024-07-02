import { exitDbConnection } from "../../../src/data-access/connections/connection";
import { sampleRainfall, sampleRainfallStations } from "../../sample/samples";
import { beforeAll, afterAll, describe, test, expect } from "bun:test";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { StationsRepository } from "../../../src/data-access/repositories/stations/stations-repository.ts";
import { RainfallRepository } from "../../../src/data-access/repositories/rainfall/rainfaill-repository.ts";
import { drizzle } from "drizzle-orm/postgres-js";

describe("rainfall", () => {
  const stationId = "S117";
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
  let rainfallService: Awaited<ReturnType<typeof RainfallRepository>>;
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

    // Do migration
    const sql = drizzle(client);

    await migrate(sql, {
      migrationsFolder: "src/data-access/migrations",
    });

    // Instantiate the station service.
    stationService = await StationsRepository(container.getConnectionUri());

    // Instantiate the rainfall service
    rainfallService = await RainfallRepository(container.getConnectionUri());

    // Insert stations before the tests.
    await stationService.upsertStationDetails(sampleRainfallStations);
  });

  afterAll(async () => {
    await rainfallService.deleteAllRainfaillReadings();
    await stationService.deleteAllStations();

    await exitDbConnection();
    await container.stop();
  });

  test("should upsert records into the rainfall table", async () => {
    const addRecords =
      await rainfallService.upsertRainfallReadings(sampleRainfall);

    expect(addRecords.length).toBe(sampleRainfall.length);
  });

  test("should get rainfall reasdings by station_id", async () => {
    const records =
      await rainfallService.findRainfallReadingsByStationId(stationId);
    expect(records[0]?.station_id).toEqual(stationId);
  });

  test("should get latest rainfall reading by stationId", async () => {
    const record =
      await rainfallService.findLatestRainfallByStationId(stationId);

    expect(record?.station_id).toEqual(stationId);
    expect(record).not.toBeNull();
  });

  test("should delete rainfall records by station_id", async () => {
    const record =
      await rainfallService.findLatestRainfallByStationId(stationId);

    if (record?.id) {
      const deletedRecords =
        await rainfallService.deleteRainfallReadingByStationId(record?.id);
      expect(deletedRecords).toBeArray();
      expect(deletedRecords[0]?.station_id).toEqual(stationId);
    }
  });

  test("should delete all rainfall records", async () => {
    const deletedRecords = await rainfallService.deleteAllRainfaillReadings();

    expect(deletedRecords.length).toEqual(sampleRainfall.length - 1);
  });
});
