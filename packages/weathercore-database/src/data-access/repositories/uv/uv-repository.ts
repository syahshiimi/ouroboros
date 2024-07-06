import { eq } from "drizzle-orm";
import { InsertUv, SelectUV } from "../../models/types.js";
import { createRepositoryConnection } from "../../connection/connection.js";
import { uv } from "../../models/index.js";

export const UVRepository = async (connectionString?: string) => {
  const connection = createRepositoryConnection({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: uv,
  });

  return {
    async findLatestUvReadingById(
      id: Exclude<SelectUV["id"], undefined | null>,
    ): Promise<SelectUV | undefined | null> {
      return await connection.query.schema.findFirst({
        where: eq(uv.id, id),
      });
    },
    async upsertUvReading(record: InsertUv[]): Promise<InsertUv[]> {
      return await connection.transaction(async (tx) => {
        return tx.insert(uv).values(record).onConflictDoNothing().returning();
      });
    },
    async deleteUvReadingById(id: Exclude<SelectUV["id"], undefined | null>) {
      const deletedRow = await connection
        .delete(uv)
        .where(eq(uv.id, id))
        .returning();

      return deletedRow.length > 1 ? null : deletedRow[0];
    },
    async deleteAllUvReadings(): Promise<SelectUV[]> {
      return connection.delete(uv).returning();
    },
  };
};
