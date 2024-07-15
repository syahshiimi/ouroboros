import { eq } from "drizzle-orm";
import { InsertStations, SelectStations } from "../../models/types.js";
import { createRepositoryConnection } from "../../connection/connection.js";
import { stations } from "../../models/index.js";

export const StationsRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: stations,
  });

  return {
    async findStationByStationId(
      station_id: Exclude<SelectStations["station_id"], undefined | null>,
    ): Promise<SelectStations | undefined | null> {
      return await connection.query.schema.findFirst({
        where: eq(stations.station_id, station_id),
      });
    },
    async getAllStations(): Promise<SelectStations[]> {
      return await connection.query.schema.findMany();
    },
    async upsertStationDetails(
      record: InsertStations[],
    ): Promise<InsertStations[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(stations)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteAllStations(): Promise<InsertStations[]> {
      return connection.delete(stations).returning();
    },
  };
};
