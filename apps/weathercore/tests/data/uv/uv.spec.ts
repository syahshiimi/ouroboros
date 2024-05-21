import { beforeAll, afterAll, describe, test, expect } from "bun:test"
import { deleteAllUvReadings, deleteUvReadingById, findLatestUvReadingById, upsertUvReading } from "../../../src/data-access/repositories/uv/uv-repository"
import { sampleUv } from "../../sample/samples"

beforeAll(async () => {
})

afterAll(async () => {
  deleteAllUvReadings()
})

describe("uv readings", () => {
  test("should upsert records into the database", async () => {
    const addRecords = await upsertUvReading(sampleUv)

    expect(addRecords.length).toBe(sampleUv.length)
  })

  test("should find latest uv reading by id", async () => {
    const addRecords = await upsertUvReading(sampleUv.slice(-1))
    expect(addRecords.length).toBe(1)

    const findRecord = await findLatestUvReadingById(addRecords[0].id!)
    expect(findRecord?.id).toBe(addRecords[0]?.id!)
  })

  test("should delete uv readings by id", async () => {
    const addRecords = await upsertUvReading(sampleUv.slice(-1))
    expect(addRecords.length).toBe(1)

    const deleteRecord = await deleteUvReadingById(addRecords[0].id!)
    expect(deleteRecord).not.toBeNaN();
    expect(deleteRecord?.id).toBe(addRecords[0].id!);
  })

  test("should delete all uv readings", async () => {
    const deletedRecords = await deleteAllUvReadings()

    expect(deletedRecords.length - 1).toBe(sampleUv.length)
  })
})
