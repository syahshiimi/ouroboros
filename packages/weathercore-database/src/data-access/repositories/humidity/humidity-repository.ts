import { eq } from "drizzle-orm";
import { createRepositoryConnection } from "../../connection/connection.js";
import { humidity } from "../../models/index.js";
import { InsertHumidity, SelectHumidity } from "../../models/types.js";

export const HumidityRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: humidity,
  });

  return {
    async findHumidityReadingsByStationId(
      station_id: Exclude<SelectHumidity["station_id"], undefined | null>,
    ): Promise<SelectHumidity[] | undefined> {
      return connection.query.schema.findMany({
        where: eq(humidity.station_id, station_id),
      });
    },
    async upsertHumidityReadings(
      record: InsertHumidity[],
    ): Promise<InsertHumidity[]> {
      return await connection.transaction(async (tx: any) => {
        return tx
          .insert(humidity)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteAllHumidityReadings() {
      return connection.delete(humidity).returning();
    },
  };
};
