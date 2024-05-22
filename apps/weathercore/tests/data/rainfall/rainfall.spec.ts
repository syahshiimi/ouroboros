import { exitDbConnection } from "../../../src/data-access/connections/connection"
import { deleteAllRainfaillReadings, deleteRainfallReadingByStationId, findLatestRainfallByStationId, findRainfallReadingsByStationId, upsertRainfallReadings } from "../../../src/data-access/repositories/rainfall/rainfaill-repository"
import { deleteAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations/stations-repository"
import { sampleRainfall, sampleRainfallStations } from "../../sample/samples"
import { beforeAll, afterAll, describe, test, expect } from "bun:test"


beforeAll(async () => {
  await upsertStationDetails(sampleRainfallStations);
});

afterAll(async () => {
  await deleteAllRainfaillReadings();
  await deleteAllStations();
  exitDbConnection();
})

describe("rainfall", () => {
  const stationId = "S117";

  test("should upsert records into the rainfall table", async () => {
    const addRecords = await upsertRainfallReadings(sampleRainfall)

    expect(addRecords.length).toBe(sampleRainfall.length)
  })

  test("should get rainfall reasdings by station_id", async () => {
    const records = await findRainfallReadingsByStationId(stationId)

    expect(records[0].station_id).toEqual(stationId)
  })

  test("should get latest rainfall reading by stationId", async () => {
    const record = await findLatestRainfallByStationId(stationId)

    expect(record?.station_id).toEqual(stationId)
    expect(record).not.toBeNull()
  })

  test("should delete rainfall records by station_id", async () => {
    const record = await findLatestRainfallByStationId(stationId)

    if (record?.id) {
      const deletedRecords = await deleteRainfallReadingByStationId(record?.id)
      expect(deletedRecords).toBeArray()
      expect(deletedRecords[0].station_id).toEqual(stationId)
    }

  })

  test("should delete all rainfall records", async () => {
    const deletedRecords = await deleteAllRainfaillReadings()

    expect(deletedRecords.length).toEqual(sampleRainfall.length - 1)
  })
})
