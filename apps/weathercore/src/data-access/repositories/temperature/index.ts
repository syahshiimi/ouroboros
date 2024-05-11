import  * as schema  from "../../models/temperature";
import type { Temperature } from "../../models/types";
import { eq, sql } from "drizzle-orm";
import {  tempeatureConnection } from "../connections";

export async function findLatestTemperatureReadingByStationId(
  station_id: Exclude<Temperature["station_id"], undefined | null>
): Promise<Temperature | undefined> {
  return await tempeatureConnection.query.temperature.findFirst({
    where: eq(schema.temperature.station_id, station_id)
  })
}

/**
 * Retrives the temperature record based [station_id] parameters.
 * @param stationId
**/
export async function findTemperatureReadingsByStationId(
  station_id: Exclude<Temperature["station_id"], undefined | null>
): Promise<Temperature[]> {
  return await tempeatureConnection.query.temperature.findMany({
    where: eq(schema.temperature.station_id, station_id)
  })
}

export async function upsertTemperatureReading(
  record: Temperature[]
): Promise<Temperature[]> {
  return await tempeatureConnection.transaction(async (tx) => {
    return await tx
      .insert(schema.temperature)
      .values(record)
      .onConflictDoNothing()
      .returning()
  })
}

export async function deleteTemperatureReadingById(
  uuid: Exclude<Temperature["id"], undefined | null>
): Promise<Temperature[] | undefined> {
  return await tempeatureConnection.delete(schema.temperature)
    .where((eq(schema.temperature.id, uuid)))
}

export async function deleteAllTemperatureReadings(): Promise<Temperature[]> {
  return tempeatureConnection.delete(schema.temperature).returning();
}
