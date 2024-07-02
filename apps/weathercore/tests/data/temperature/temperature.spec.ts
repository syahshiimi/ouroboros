import { beforeAll, afterAll, describe, test, expect } from "bun:test";
import { sampleStations, sampleTemperatures } from "../../sample/samples";
import { exitDbConnection } from "../../../src/data-access/connections/connection";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { StationsRepository } from "../../../src/data-access/repositories/stations/stations-repository.ts";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { TemperatureRepository } from "../../../src/data-access/repositories/temperature/temperature-repository.ts";
import { drizzle } from "drizzle-orm/postgres-js";

describe("temperature readings", () => {
  const stationId = "S117";
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
  let stationService: Awaited<ReturnType<typeof StationsRepository>>;
  let temperatureService: Awaited<ReturnType<typeof TemperatureRepository>>;

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
    temperatureService = await TemperatureRepository(
      container.getConnectionUri(),
    );

    // Instantiate the service here.
    stationService = await StationsRepository(container.getConnectionUri());

    // Insert the station details before test.
    await stationService.upsertStationDetails(sampleStations);
  });

  afterAll(async () => {
    await temperatureService.deleteAllTemperatureReadings();
    await stationService.deleteAllStations();

    await exitDbConnection();
    await container.stop();
  });

  test("should upsert records into the database", async () => {
    const addRecords =
      await temperatureService.upsertTemperatureReading(sampleTemperatures);
    expect(addRecords.length).toBe(sampleTemperatures.length);
    expect(addRecords[0]?.file_name).toBe("2024-01-21-temperature.json");
  });

  test("should get latest temperature reading by station_id", async () => {
    const record =
      await temperatureService.findLatestTemperatureReadingByStationId(
        stationId,
      );

    expect(record).toContainKey("reading");
    expect(record?.station_id).toBe(stationId);
  });

  test("should return a list of temperature readings when querying by station_id", async () => {
    const records =
      await temperatureService.findLatestTemperatureReadingByStationId(
        stationId,
      );

    expect(records).toBeArray;
    expect(records).toContainKey("reading");
  });

  test("should delete temperature readings record by temperature reading id", async () => {
    const getRecord =
      await temperatureService.findLatestTemperatureReadingByStationId(
        stationId,
      );
    if (getRecord?.id) {
      const deleted = temperatureService.deleteTemperatureReadingById(
        getRecord?.id,
      );
      expect(deleted).toBeArray;
    }
  });

  test("should delete all temperature reading records in the table", async () => {
    const deleted = await temperatureService.deleteAllTemperatureReadings();

    expect(deleted.length).not.toBeNaN;
    expect(deleted).toBeArray;
  });
});
