import { eq } from "drizzle-orm";
import { stations } from "../../models/db/station";
import type { Stations } from "../../models/types";
import type { StationSchema } from "../../models/schema";
import { createRepositoryConnection } from "../../connections/connection.ts";

export const StationsRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection<StationSchema>({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: stations,
  });

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
