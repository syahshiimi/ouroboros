import { eq } from "drizzle-orm";
import { stations } from "../../models/db/station";
import { drizzleConnection } from "../connections";
import type { Stations } from "../../models/types";
import type { StationSchema } from "../../models/schema";

const connection = drizzleConnection<StationSchema>(stations)

export async function findStationByStationId(
  station_id: Exclude<Stations["station_id"], undefined | null>): Promise<Stations | undefined | null> {
  return await connection.query.schema
    .findFirst({
      where: eq(stations.station_id, station_id)
    })
}

export async function getAllStations(): Promise<Stations[]> {
  return await connection.query.schema.findMany()
}

export async function upsertStationDetails(
  record: Stations[]
): Promise<Stations[]> {
  return await connection.transaction(async (tx) => {
    return await tx
      .insert(stations)
      .values(record)
      .onConflictDoNothing()
      .returning();
  })
}

export async function deleteAllStations(): Promise<Stations[]> {
  return await connection.delete(stations).returning()
}

