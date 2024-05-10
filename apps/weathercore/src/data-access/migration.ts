import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createDbConnection, exitDbConnection } from './connections/connection';

export const main = async () => {
  const sql = drizzle(createDbConnection(1))

  await migrate(sql, { migrationsFolder: "src/data-access/migrations" })
  await exitDbConnection()
}

main()
