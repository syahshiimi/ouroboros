import { exitDbConnection } from "../../../src/data-access/connections/connection"
import { deleteAllHumidityReadings, findHumidityReadingsByStationId, upsertHumidityReadings } from "../../../src/data-access/repositories/humidity/humidity-repository"
import { deleteAllStations, upsertStationDetails } from "../../../src/data-access/repositories/stations/stations-repository"
import { sampleHumidity, sampleStations } from "../../sample/samples"
import { beforeAll, afterAll, describe, expect, test } from "bun:test"


beforeAll(async () => {
  await upsertStationDetails(sampleStations)
})

afterAll(async () => {
  await deleteAllHumidityReadings();
  await deleteAllStations();
  await exitDbConnection();
})

describe("humidity records", () => {
  const stationId = "S117"

  test("should upsert humidity records into the database", async () => {
    const addHumidityRecords = await upsertHumidityReadings(sampleHumidity)

    expect(addHumidityRecords).not.toBeNull()
    expect(addHumidityRecords.length).toBe(sampleHumidity.length)
    expect(addHumidityRecords[0]).toMatchObject({
      file_name: "sampleHumidity.json"
    })
  })

  test("should get humidity records by station_id", async () => {
    const humidityRecords = await findHumidityReadingsByStationId(stationId)

    expect(humidityRecords?.[0]).toMatchObject({ station_id: stationId, file_name: "sampleHumidity.json" })
  })

  test("should delete all humidity records", async () => {
    const deleteRecords = await deleteAllHumidityReadings();

    expect(deleteRecords.length).toEqual(sampleHumidity.length)
  })
})
