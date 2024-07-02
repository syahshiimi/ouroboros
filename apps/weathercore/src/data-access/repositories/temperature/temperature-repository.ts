import { type Temperature } from "../../models/types";
import type { TemperatureSchema } from "../../models/schema";
import { eq } from "drizzle-orm";
import { temperature } from "../../models/db/temperature";
import { createRepositoryConnection } from "../../connections/connection.ts";

export const TemperatureRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection<TemperatureSchema>({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: temperature,
  });

  return {
    async findLatestTemperatureReadingByStationId(
      station_id: Exclude<Temperature["station_id"], undefined | null>,
    ): Promise<Temperature | undefined> {
      return await connection.query.schema.findFirst({
        where: eq(temperature.station_id, station_id),
      });
    },
    async findTemperatureReadingsByStationId(
      station_id: Exclude<Temperature["station_id"], undefined | null>,
    ): Promise<Temperature[]> {
      return await connection.query.schema.findMany({
        where: eq(temperature.station_id, station_id),
      });
    },
    async upsertTemperatureReading(
      record: Temperature[],
    ): Promise<Temperature[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(temperature)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteTemperatureReadingById(
      uuid: Exclude<Temperature["id"], undefined | null>,
    ) {
      const deletedRow = await connection
        .delete(temperature)
        .where(eq(temperature.id, uuid))
        .returning();

      return deletedRow.length > 1 ? null : deletedRow[0];
    },
    async deleteAllTemperatureReadings(): Promise<Temperature[]> {
      return connection.delete(temperature).returning();
    },
  };
};
