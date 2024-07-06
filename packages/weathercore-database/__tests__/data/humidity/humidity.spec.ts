import { beforeAll, afterAll, describe, expect, test } from "bun:test";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { exitDbConnection } from "../../../src/index.js";
import { sampleHumidity, sampleStations } from "../../sample/samples.js";
import {
  HumidityRepository,
  StationsRepository,
} from "../../../src/data-access/repositories/index.js";

describe("humidity records", () => {
  const stationId = "S117";
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
  let stationService: Awaited<ReturnType<typeof StationsRepository>>;
  let humidityService: Awaited<ReturnType<typeof HumidityRepository>>;

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
    humidityService = await HumidityRepository(container.getConnectionUri());

    // Instantiate the service here.
    stationService = await StationsRepository(container.getConnectionUri());

    // Insert the station details before test.
    await stationService.upsertStationDetails(sampleStations);
  });

  afterAll(async () => {
    await humidityService.deleteAllHumidityReadings();
    await stationService.deleteAllStations();

    await exitDbConnection();
    await container.stop();
  });

  test("should upsert humidity records into the database", async () => {
    const addHumidityRecords =
      await humidityService.upsertHumidityReadings(sampleHumidity);

    expect(addHumidityRecords).not.toBeNull();
    expect(addHumidityRecords.length).toBe(sampleHumidity.length);
    expect(addHumidityRecords[0]).toMatchObject({
      file_name: "sampleHumidity.json",
    });
  });

  test("should get humidity records by station_id", async () => {
    const humidityRecords =
      await humidityService.findHumidityReadingsByStationId(stationId);

    expect(humidityRecords?.[0]).toMatchObject({
      station_id: stationId,
      file_name: "sampleHumidity.json",
    });
  });

  test("should delete all humidity records", async () => {
    const deleteRecords = await humidityService.deleteAllHumidityReadings();

    expect(deleteRecords.length).toEqual(sampleHumidity.length);
  });
});
