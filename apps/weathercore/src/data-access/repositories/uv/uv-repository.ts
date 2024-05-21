import { eq } from "drizzle-orm";
import { uv } from "../../models/db/uv";
import type { UV } from "../../models/types";
import { drizzleConnection } from "../connections";

const connection = drizzleConnection(uv)

export async function findLatestUvReadingById(
  id: Exclude<UV["id"], undefined | null>
): Promise<UV | undefined | null> {
  return await connection.query.schema.findFirst({
    where: eq(uv.id, id)
  });
};

export async function upsertUvReading(
  record: UV[]
): Promise<UV[]> {
  return await connection.transaction(async (tx) => {
    return await tx
      .insert(uv)
      .values(record)
      .onConflictDoNothing()
      .returning();
  });
};

export async function deleteUvReadingById(
  id: Exclude<UV["id"], undefined | null>
) {
  const deletedRow = await connection
    .delete(uv)
    .where(eq(uv.id, id))
    .returning();

  return deletedRow.length > 1 ? null : deletedRow[0];
};

export async function deleteAllUvReadings(): Promise<UV[]> {
  return connection.delete(uv).returning();
};


