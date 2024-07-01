import { eq } from "drizzle-orm";
import { stations } from "../../models/db/station";
import { drizzleConnection } from "../connections";
import type { Stations } from "../../models/types";
import type { StationSchema } from "../../models/schema";
import { createDbConnection } from "../../connections/connection.ts";

export const StationsRepository = async (connectionString?: string) => {
  const dbConnection = createDbConnection(5, connectionString);
  const connection = drizzleConnection<StationSchema>(stations, dbConnection);

  return {
    async findStationByStationId(
      station_id: Exclude<Stations["station_id"], undefined | null>,
    ): Promise<Stations | undefined | null> {
      return await connection.query.schema.findFirst({
        where: eq(stations.station_id, station_id),
      });
    },
    async getAllStations(): Promise<Stations[]> {
      return await connection.query.schema.findMany();
    },
    async upsertStationDetails(record: Stations[]): Promise<Stations[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(stations)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteAllStations(): Promise<Stations[]> {
      return connection.delete(stations).returning();
    },
  };
};
