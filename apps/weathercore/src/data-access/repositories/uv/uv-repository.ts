import { eq } from "drizzle-orm";
import { uv } from "../../models/db/uv";
import type { UV } from "../../models/types";
import type { UvSchema } from "../../models/schema.ts";
import { createRepositoryConnection } from "../../connections/connection.ts";

export const UVRepository = async (connectionString: string) => {
  const connection = createRepositoryConnection<UvSchema>({
    connectionNumber: 5,
    connectionString: connectionString,
    schema: uv,
  });

  return {
    async findLatestUvReadingById(
      id: Exclude<UV["id"], undefined | null>,
    ): Promise<UV | undefined | null> {
      return await connection.query.schema.findFirst({
        where: eq(uv.id, id),
      });
    },
    async upsertUvReading(record: UV[]): Promise<UV[]> {
      return await connection.transaction(async (tx) => {
        return tx.insert(uv).values(record).onConflictDoNothing().returning();
      });
    },
    async deleteUvReadingById(id: Exclude<UV["id"], undefined | null>) {
      const deletedRow = await connection
        .delete(uv)
        .where(eq(uv.id, id))
        .returning();

      return deletedRow.length > 1 ? null : deletedRow[0];
    },
    async deleteAllUvReadings(): Promise<UV[]> {
      return connection.delete(uv).returning();
    },
  };
};
