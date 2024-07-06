import { eq } from "drizzle-orm";
import { createRepositoryConnection } from "../../connection/connection.js";
import { temperature } from "../../models/index.js";
import { InsertTemperature, SelectTemperature } from "../../models/types.js";

export const TemperatureRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: temperature,
  });

  return {
    async findLatestTemperatureReadingByStationId(
      station_id: Exclude<SelectTemperature["station_id"], undefined | null>,
    ): Promise<SelectTemperature | undefined> {
      return await connection.query.schema.findFirst({
        where: eq(temperature.station_id, station_id),
      });
    },
    async findTemperatureReadingsByStationId(
      station_id: Exclude<SelectTemperature["station_id"], undefined | null>,
    ): Promise<SelectTemperature[]> {
      return await connection.query.schema.findMany({
        where: eq(temperature.station_id, station_id),
      });
    },
    async upsertTemperatureReading(
      record: InsertTemperature[],
    ): Promise<InsertTemperature[]> {
      return await connection.transaction(async (tx) => {
        return tx
          .insert(temperature)
          .values(record)
          .onConflictDoNothing()
          .returning();
      });
    },
    async deleteTemperatureReadingById(
      uuid: Exclude<InsertTemperature["id"], undefined | null>,
    ) {
      const deletedRow = await connection
        .delete(temperature)
        .where(eq(temperature.id, uuid))
        .returning();

      return deletedRow.length > 1 ? null : deletedRow[0];
    },
    async deleteAllTemperatureReadings(): Promise<InsertTemperature[]> {
      return connection.delete(temperature).returning();
    },
  };
};
