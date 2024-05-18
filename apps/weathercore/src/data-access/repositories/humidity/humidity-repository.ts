import { drizzle } from "drizzle-orm/postgres-js";
import { humidity } from "../../models/db/humidity";
import type { Humidity } from "../../models/types";
import { eq } from "drizzle-orm";
import { drizzleConnection } from "../connections";

const connection = drizzleConnection(humidity)

export async function findHumidityReadingsByStationId(
  station_id: Exclude<Humidity["station_id"], undefined | null>
): Promise<Humidity[] | undefined> {
  return await connection.query.schema.findMany({
    where: eq(humidity.station_id, station_id)
  })
}

export async function upsertHumidityReadings(
  record: Humidity[]
): Promise<Humidity[]> {
  return await connection.transaction(async (tx) => {
    return await tx
      .insert(humidity)
      .values(record)
      .onConflictDoNothing()
      .returning()
  })
}

export async function deleteAllHumidityReadings() {
  return await connection.delete(humidity).returning();
}
