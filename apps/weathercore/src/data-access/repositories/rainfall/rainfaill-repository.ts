import { rainfall } from "../../models/db/rainfall";
import type { Rainfall } from "../../models/types";
import { stations } from "../../models/db/station";
import { eq } from "drizzle-orm";
import { type RainfallSchema } from "../../models/schema";
import { createRepositoryConnection } from "../../connections/connection.ts";

export const RainfallRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection<RainfallSchema>({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: rainfall,
  });

  return {
    async findLatestRainfallByStationId(
      station_id: Exclude<Rainfall["station_id"], undefined | null>,
    ): Promise<Rainfall | undefined> {
      return await connection.query.schema.findFirst({
        where: eq(stations.station_id, station_id),
      });
    },

    async findRainfallReadingsByStationId(
      station_id: Exclude<Rainfall["station_id"], undefined | null>,
    ): Promise<Rainfall[]> {
      return await connection.query.schema.findMany({
        where: eq(rainfall.station_id, station_id),
      });
    },

    async upsertRainfallReadings(record: Rainfall[]): Promise<Rainfall[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(rainfall)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteRainfallReadingByStationId(
      uuid: Exclude<Rainfall["id"], undefined | null>,
    ) {
      return connection
        .delete(rainfall)
        .where(eq(rainfall.id, uuid))
        .returning();
    },
    async deleteAllRainfaillReadings(): Promise<Rainfall[]> {
      return connection.delete(rainfall).returning();
    },
  };
};
