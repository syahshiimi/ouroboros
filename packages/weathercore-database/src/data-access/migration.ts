import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import {
  createDbConnection,
  exitDbConnection,
} from "./connection/connection.js";

export const main = async () => {
  const sql = drizzle(createDbConnection(1));

  await migrate(sql, {
    migrationsFolder: "./src/data-access/migrations",
    migrationsTable: "drizzle_migrations",
    migrationsSchema: "public",
  });
  await exitDbConnection();
};

await main().then(() => console.log("Migration"));
