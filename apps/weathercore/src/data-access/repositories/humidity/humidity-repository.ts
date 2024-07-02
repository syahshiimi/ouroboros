import { humidity } from "../../models/db/humidity";
import type { Humidity } from "../../models/types";
import { type HumiditySchema } from "../../models/schema";
import { eq } from "drizzle-orm";
import { createRepositoryConnection } from "../../connections/connection.ts";

export const HumidityRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection<HumiditySchema>({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: humidity,
  });

  return {
    async findHumidityReadingsByStationId(
      station_id: Exclude<Humidity["station_id"], undefined | null>,
    ): Promise<Humidity[] | undefined> {
      return await connection.query.schema.findMany({
        where: eq(humidity.station_id, station_id),
      });
    },
    async upsertHumidityReadings(record: Humidity[]): Promise<Humidity[]> {
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
