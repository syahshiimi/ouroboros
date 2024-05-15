import { exitDbConnection } from "../../../src/data-access/connections/connection"
import { deleteAllRainfaillReadings, upsertRainfallReadings } from "../../../src/data-access/repositories/rainfall/rainfaill-repository"
import { deleteAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations/stations-repository"
import { sampleRainfall, sampleRainfallStations, sampleStations } from "../../sample/samples"
import { beforeAll, afterAll, describe, test, expect } from "bun:test"

const stationId = "S117";

beforeAll(async () => {
  await upsertStationDetails(sampleRainfallStations);
});

afterAll(async () => {
  await deleteAllRainfaillReadings();
  await deleteAllStations();
  exitDbConnection();
})

describe("rainfall", () => {
  test("should upsert records into the rainfall table", async () => {
    const addRecords = await upsertRainfallReadings(sampleRainfall)

    expect(addRecords.length).toBe(sampleRainfall.length)
  })
})
