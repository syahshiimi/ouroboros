import { eq } from "drizzle-orm";
import { PostgresDatabase } from "../../connection/connection.js";
import { fetchJobs } from "../../models/index.js";
import { InsertFetchJobs, SelectFetchJobs } from "../../models/types.js";
import { FetchJobsSchema } from "../../models/schema.js";

// Repository are abstractionso over collections.
// Repository are also where we perform direct database operations vis-a-vis the ORM operations.
// It is the layer that sits infront of the database.
export class FetchJobsRepository {
  constructor(private database: PostgresDatabase<FetchJobsSchema>) {}

  async findById(id: string) {
    const db = await this.database.connection()
    return db.query.schema.findFirst({
      where: eq(fetchJobs.id, id)
    })
  }

  async findByTopic(
    topic: Exclude<SelectFetchJobs["topic"], undefined | null>
  ) {
    const db = await this.database.connection();
    return db.query.schema.findFirst({
      where: eq(fetchJobs.topic, topic)
    })
  }

  async upsertFetchJobsRows(
    fetch_task: InsertFetchJobs[]
  ) {
    const db = await this.database.connection();
    return await db.transaction(async (tx) => {
      return tx.insert(fetchJobs).values(fetch_task).returning()
    })
  }

  async deleteById(id: string){
    const db = await this.database.connection();
    return db.delete(fetchJobs).where(eq(fetchJobs.id, id))
  }

  async delete() {
    const db = await this.database.connection();
    return db.delete(fetchJobs)
  }
}

