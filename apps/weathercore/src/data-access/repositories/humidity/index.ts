import { drizzle } from "drizzle-orm/postgres-js";
import { dbConnection } from "../connections";
import { humidity } from "../../models/humidity";
import type { Humidity } from "../../models/types";
import { eq } from "drizzle-orm";

const connection = drizzle(dbConnection, { schema: { humidity } })

export async function findHumidityReadingsByStationId(
  station_id: Exclude<Humidity["station_id"], undefined | null>
): Promise<Humidity[] | undefined> {
  return await connection.query.humidity.findMany({
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
