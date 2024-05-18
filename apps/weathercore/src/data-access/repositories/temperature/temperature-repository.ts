import { type Temperature } from "../../models/types";
import type { TemperatureSchema } from "../../models/schema";
import { eq } from "drizzle-orm";
import { temperature } from "../../models/db/temperature";
import { drizzleConnection } from "../connections";

const connection = drizzleConnection<TemperatureSchema>(temperature)

export async function findLatestTemperatureReadingByStationId(
  station_id: Exclude<Temperature["station_id"], undefined | null>
): Promise<Temperature | undefined> {
  return await connection.query.schema.findFirst({
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
  return await connection.query.schema.findMany({
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
) {
  const deletedRow = await connection.delete(temperature)
    .where((eq(temperature.id, uuid)))
    .returning()

  return deletedRow.length > 1 ? null : deletedRow[0]
}

export async function deleteAllTemperatureReadings(): Promise<Temperature[]> {
  return connection.delete(temperature).returning();
}
