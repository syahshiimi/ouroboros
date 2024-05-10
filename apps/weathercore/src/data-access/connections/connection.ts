import postgres from "postgres";

const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const connectionString = `postgresql://${DB_USER!}:${DB_PASSWORD!}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/** 
 * Creates a DB connection to the endpoint.
 * @param [connection=1]  Defines the connections to the DB. For migrations, set to 1.
**/
export function createDbConnection(connection: number = 1) {
  return postgres(connectionString, { max: connection });
}

/**
 * Exits the DB conenction gracefully.
 */
export function exitDbConnection() {
  return createDbConnection().end()
}
