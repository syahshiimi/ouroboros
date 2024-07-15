import { rainfall } from "../../models/index.js";
import { createRepositoryConnection } from "../../connection/connection.js";
import { InsertRainfall, SelectRainfall } from "../../models/types.js";
import { eq } from "drizzle-orm";
export const RainfallRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: rainfall,
  });

  return {
    async findLatestRainfallByStationId({
      station_id,
    }: {
      station_id: Exclude<SelectRainfall["station_id"], undefined | null>;
    }): Promise<SelectRainfall | undefined> {
      return await connection.query.schema.findFirst({
        where: eq(rainfall.station_id, station_id),
      });
    },

    async findRainfallReadingsByStationId(
      station_id: Exclude<SelectRainfall["station_id"], undefined | null>,
    ): Promise<SelectRainfall[]> {
      return await connection.query.schema.findMany({
        where: eq(rainfall.station_id, station_id),
      });
    },

    async upsertRainfallReadings(
      record: InsertRainfall[],
    ): Promise<InsertRainfall[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(rainfall)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteRainfallReadingByStationId(
      uuid: Exclude<InsertRainfall["id"], undefined | null>,
    ) {
      return connection
        .delete(rainfall)
        .where(eq(rainfall.id, uuid))
        .returning();
    },
    async deleteAllRainfallReadings(): Promise<InsertRainfall[]> {
      return connection.delete(rainfall).returning();
    },
  };
};
