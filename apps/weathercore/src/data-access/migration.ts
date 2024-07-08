import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { createDbConnection, exitDbConnection } from "./connections/connection";

export const main = async () => {
  const sql = drizzle(createDbConnection(1));
  try {
    await migrate(sql, {
      migrationsFolder: "src/data-access/migrations",
      migrationsTable: "drizzle_migrations",
      migrationsSchema: "public",
    });
  } finally {
    await exitDbConnection();
  }
};

main()
  .catch(console.error)
  .finally(() => process.exit(0));
