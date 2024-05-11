import { exitDbConnection } from "../../../src/data-access/connections/connection";
import { deleteAllStations, findStationByStationId, getAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations"
import { sampleStations } from "../../sample/samples";
import { beforeAll, afterAll, describe, test, expect } from "bun:test"

const stationId = "S117"

beforeAll(async () => {
  await deleteAllStations();
})

afterAll(async () => {
  await deleteAllStations();
  await exitDbConnection();
})

describe("station records", () => {
  test("should upsert station records into the database", async () => {
    const addStations = await upsertStationDetails(sampleStations)

    expect(addStations.length).toBe(sampleStations.length)
  })

  test("should find station record by station_id", async () => {
    const station = await findStationByStationId(stationId)

    expect(station).not.toBeNull()
    expect(station?.station_id).toBe(stationId)
  })


  test("should expect to get all stations", async () => {
    const allStations = await getAllStations()

    expect(allStations.length).toEqual(sampleStations.length)
  })

  test("should delete all stations", async () => {
    const station = await deleteAllStations()

    expect(station.length).toBe(sampleStations.length)
  })

})
