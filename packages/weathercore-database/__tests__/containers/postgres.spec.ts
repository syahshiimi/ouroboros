import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { describe, it, beforeAll, afterAll, expect } from "bun:test";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

describe("PostgreSQL Container Test", async () => {
  let container: StartedPostgreSqlContainer;
  let client: postgres.Sql;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    client = postgres({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    // do migration
    const sql = drizzle(client);

    await migrate(sql, {
      migrationsFolder: "src/data-access/migrations",
    });
  });

  afterAll(async () => {
    await container.stop();
  });

  it("should connect to PostgreSQL", async () => {
    const connectionString = container.getConnectionUri();
    console.log("Connection string:", connectionString);
    expect(connectionString).toBeString();
    // Add your test logic and assertions here
  });

  it("should run migration", async () => {
    const pg = client;

    const query = await pg`select * from humidity`;
    expect(query).toBeTruthy();
    expect(Array.isArray(query)).toBe(true);
  });
});
