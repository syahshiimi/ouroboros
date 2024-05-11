import { eq } from "drizzle-orm";
import type { Stations } from "../../models/types";
import { stations } from "../../models/station";
import { drizzle } from "drizzle-orm/postgres-js";
import { dbConnection } from "../connections";

const connection = drizzle(dbConnection, { schema: { stations } })

export async function findStationByStationId(station_id: Exclude<Stations["station_id"], undefined | null>)
  : Promise<Stations | undefined> {
  return await connection.query.stations.findFirst({
    where: eq(stations.station_id, station_id)
  })
}

export async function getAllStations(): Promise<Stations[]> {
  return await connection.query.stations.findMany()
}

export async function upsertStationDetails(
  record: Stations[]
): Promise<Stations[]> {
  return await connection.transaction(async (tx) => {
    return await tx
      .insert(stations)
      .values(record)
      .onConflictDoNothing()
      .returning()
  })
}

export async function deleteAllStations(): Promise<Stations[]> {
  return connection.delete(stations).returning()
}

