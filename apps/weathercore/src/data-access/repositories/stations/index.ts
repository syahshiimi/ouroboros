import { eq } from "drizzle-orm";
import type { Stations } from "../../models/types";
import {  stationConnection } from "../connections";
import { stations } from "../../models/station";


export async function findStationByStationId(station_id: Exclude<Stations["station_id"], undefined | null>)
  : Promise<Stations | undefined> {
  return await stationConnection.query.stations.findFirst({
    where: eq(stations.station_id, station_id)
  })
}

export async function upsertStationDetails(
  record: Stations[]
): Promise<Stations[]> {
  return await stationConnection.transaction(async (tx) => {
    return await tx
      .insert(stations)
      .values(record)
      .onConflictDoNothing()
      .returning()
  })
}

export async function deleteAllStations(): Promise<Stations[]> {
  return stationConnection.delete(stations).returning()
}

