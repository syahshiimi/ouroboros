import { beforeAll, afterAll, describe, test, expect } from "bun:test"
import { deleteAllTemperatureReadings, findLatestTemperatureReadingByStationId, upsertTemperatureReading } from "../../../src/data-access/repositories/temperature"
import { deleteAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations"
import { sampleStations, sampleTemperatures } from "../../sample/samples"

beforeAll(async () => {
  await upsertStationDetails(sampleStations)
})

afterAll(async () => {
  deleteAllTemperatureReadings()
  deleteAllStations()
})

describe("temperature readings", () => {
  test("should upsert records into the database", async () => {
    const addRecords = await Promise.resolve(upsertTemperatureReading(sampleTemperatures))
    expect(addRecords.length).toBe(sampleTemperatures.length)
  })
  
  test("should get temperature reading by station_id", async () => {
        const stationId = "S117"
        const record = await Promise.resolve(findLatestTemperatureReadingByStationId(stationId))
        
        expect(record).toContainKey("reading")
        expect(record?.station_id).toBe(stationId)
  })
  
})


