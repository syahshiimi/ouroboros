import { exitDbConnection } from "../../../src/data-access/connections/connection";
import { sampleStations } from "../../sample/samples";
import { beforeAll, afterAll, describe, test, expect } from "bun:test";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { StationsRepository } from "../../../src/data-access/repositories/stations/stations-repository.ts";
import { drizzle } from "drizzle-orm/postgres-js";

describe("station records", () => {
  const stationId = "S117";
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;
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

    // Instantiate the service here.
    stationService = await StationsRepository(container.getConnectionUri());

    await stationService.deleteAllStations();
  });

  afterAll(async () => {
    await stationService.deleteAllStations();
    await exitDbConnection();
    await container.stop();
  });

  test("should upsert station records into the database", async () => {
    const addStations =
      await stationService.upsertStationDetails(sampleStations);

    expect(addStations.length).toBe(sampleStations.length);
  });

  test("should find station record by station_id", async () => {
    const station = await stationService.findStationByStationId(stationId);

    expect(station).not.toBeNull();
    expect(station?.station_id).toBe(stationId);
  });

  test("should expect to get all stations", async () => {
    const allStations = await stationService.getAllStations();

    expect(allStations.length).toEqual(sampleStations.length);
  });

  test("should delete all stations", async () => {
    const station = await stationService.deleteAllStations();

    expect(station.length).toBe(sampleStations.length);
  });
});
