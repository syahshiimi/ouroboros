import { createRepositoryConnection, humidity, type SelectHumidity } from "@ouroboros/weathercore-database";
import { eq } from "drizzle-orm";

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
      return await connection.query.schema.findMany({
        where: eq(humidity.station_id, station_id),
      });
    },
    async upsertHumidityReadings(record: SelectHumidity[]): Promise<SelectHumidity[]> {
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
