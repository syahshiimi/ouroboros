import postgres, { ConnectionParameters } from "postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const dbConnectionString = `postgresql://${DB_USER!}:${DB_PASSWORD!}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const createDbConnection = (
  connection: number = 1,
  connectionString: string = dbConnectionString,
) => {
  return postgres(connectionString, { max: connection });
};

/**
 * Creates the connection for a repository service for a table.
 *
 * @param {object} args configuration arguments.
 * @param {number} args.connectionNumber The connection connectors to the database.
 * @param {string} args.connectionString The connection string to the table.
 **/
export const createRepositoryConnection = <T extends PgTable>(args: {
  connectionNumber?: number;
  connectionString?: string;
  schema: T;
}): PostgresJsDatabase<{ schema: T }> => {
  const dbConnection = createDbConnection(
    args.connectionNumber,
    args.connectionString,
  );

  const { schema } = args;
  return drizzle(dbConnection, { schema: { schema } });
};

/*
 * Exits the DB conenction gracefully.
 */
export function exitDbConnection() {
  return createDbConnection().end();
}

export class PostgresDatabase<T> {
  private pool: postgres.Sql<{}>

  constructor(private schema: T) {
    this.pool = postgres(dbConnectionString, { max: 5})
  }

  async connection()  {
    return drizzle(this.pool, { schema: { schema: this.schema}})
  }

  async createDbConnection() {
    return drizzle(this.pool, { schema: { schema: this.schema}}).query
  }

  async discconect(): Promise<void> {
    await this.pool.end();
  }
}
