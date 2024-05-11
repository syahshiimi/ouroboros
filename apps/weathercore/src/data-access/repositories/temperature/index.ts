import type { Temperature } from "../../models/types";
import { eq } from "drizzle-orm";
import {  dbConnection  } from "../connections";
import { temperature } from "../../models/temperature";
import { drizzle } from "drizzle-orm/postgres-js";

const connection = drizzle(dbConnection, { schema: { temperature}})

export async function findLatestTemperatureReadingByStationId(
  station_id: Exclude<Temperature["station_id"], undefined | null>
): Promise<Temperature | undefined> {
  return await connection.query.temperature.findFirst({
    where: eq(temperature.station_id, station_id)
  })
}

/**
 * Retrives the temperature record based [station_id] parameters.
 * @param stationId
**/
export async function findTemperatureReadingsByStationId(
  station_id: Exclude<Temperature["station_id"], undefined | null>
): Promise<Temperature[]> {
  return await connection.query.temperature.findMany({
    where: eq(temperature.station_id, station_id)
  })
}

export async function upsertTemperatureReading(
  record: Temperature[]
): Promise<Temperature[]> {
  return await connection.transaction(async (tx) => {
    return await tx
      .insert(temperature)
      .values(record)
      .onConflictDoNothing()
      .returning()
  })
}

export async function deleteTemperatureReadingById(
  uuid: Exclude<Temperature["id"], undefined | null>
): Promise<Temperature[] | undefined> {
  return await connection.delete(temperature)
    .where((eq(temperature.id, uuid))).returning()
}

export async function deleteAllTemperatureReadings(): Promise<Temperature[]> {
  return connection.delete(temperature).returning();
}
