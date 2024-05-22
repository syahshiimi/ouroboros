import { beforeAll, afterAll, describe, test, expect } from "bun:test"
import { deleteAllTemperatureReadings, deleteTemperatureReadingById, findLatestTemperatureReadingByStationId, upsertTemperatureReading } from "../../../src/data-access/repositories/temperature/temperature-repository"
import { deleteAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations/stations-repository"
import { sampleStations, sampleTemperatures } from "../../sample/samples"
import { exitDbConnection } from "../../../src/data-access/connections/connection"


beforeAll(async () => {
  await upsertStationDetails(sampleStations)
})

afterAll(async () => {
  deleteAllTemperatureReadings();
  deleteAllStations();
  exitDbConnection();
})

describe("temperature readings", () => {
  const stationId = "S117"

  test("should upsert records into the database", async () => {
    const addRecords = await upsertTemperatureReading(sampleTemperatures)
    expect(addRecords.length).toBe(sampleTemperatures.length)
  })

  test("should get latest temperature reading by station_id", async () => {
    const record = await (findLatestTemperatureReadingByStationId(stationId))

    expect(record).toContainKey("reading")
    expect(record?.station_id).toBe(stationId)
  })

  test("should return a list of temperature readings when querying by station_id", async () => {
    const records = await findLatestTemperatureReadingByStationId(stationId)

    expect(records).toBeArray
    expect(records).toContainKey("reading")
  })

  test("should delete temperature readings record by temperature reading id", async () => {
    const getRecord = await findLatestTemperatureReadingByStationId(stationId)
    if (getRecord?.id) {
      const deleted = deleteTemperatureReadingById(getRecord?.id)
      expect(deleted).toBeArray
    }

  })

  test("should delete all temperature reading records in the table", async () => {
    const deleted = await deleteAllTemperatureReadings()

    expect(deleted.length).not.toBeNaN
    expect(deleted).toBeArray
  })

})
