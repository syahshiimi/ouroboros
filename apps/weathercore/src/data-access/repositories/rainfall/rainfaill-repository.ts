import { rainfall } from "../../models/db/rainfall";
import type { Rainfall } from "../../models/types";
import { stations } from "../../models/db/station";
import { eq } from "drizzle-orm";
import { drizzleConnection } from "../connections";
import { type RainfallSchema } from "../../models/schema";

const connection = drizzleConnection<RainfallSchema>(rainfall)

export async function findLatestRainfallByStationId(
  station_id: Exclude<Rainfall["station_id"], undefined | null>
): Promise<Rainfall | undefined> {
  return await connection.query.schema.findFirst({
    where: eq(stations.station_id, station_id)
  })
}

export async function findRainfallReadingsByStationId(
  station_id: Exclude<Rainfall["station_id"], undefined | null>
): Promise<Rainfall[]> {
  return await connection.query.schema.findMany({
    where: eq(rainfall.station_id, station_id)
  })
}

export async function upsertRainfallReadings(
  record: Rainfall[]
): Promise<Rainfall[]> {
  return await connection.transaction((async (tx) => {
    return tx
      .insert(rainfall)
      .values(record)
      .onConflictDoNothing()
      .returning()
  }))
}

export async function deleteRainfallReadingByStationId(
  uuid: Exclude<Rainfall["id"], undefined | null>
) {
  return await connection.delete(rainfall)
    .where((eq(rainfall.id, uuid)))
    .returning()
}

export async function deleteAllRainfaillReadings(): Promise<Rainfall[]> {
  return await connection.delete(rainfall).returning()
}

