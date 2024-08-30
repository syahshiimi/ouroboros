import { eq } from "drizzle-orm";
import { DatabaseService } from "../../connection/connection.js";
import { fetchJobs } from "../../models/index.js";
import { InsertFetchJobs, SelectFetchJobs } from "../../models/types.js";

// Repository are abstractionso over collections.
// Repository are also where we perform direct database actions vis-a-vis the ORM.
// It is the layer that sits infront of the database.
export class FetchJobsRepository {
  private db() {
    const db = new DatabaseService(fetchJobs)
    return db.createConection()
  }

  async findById(id: string) {
    return this.db().query.schema.findFirst({
      where: eq(fetchJobs.id, id)
    })
  }

  async findByTopic(
    topic: Exclude<SelectFetchJobs["topic"], undefined | null>
  ) {
    return this.db().query.schema.findFirst({
      where: eq(fetchJobs.topic, topic)
    })
  }

  async upsertFetchJobsRows(
    fetch_task: InsertFetchJobs[]
  ) {
    return await this.db().transaction(async (tx) => {
      return tx.insert(fetchJobs).values(fetch_task).returning()
    })
  }

  async deleteById(id: string){
    return this.db().delete(fetchJobs).where(eq(fetchJobs.id, id))
  }

  async delete() {
    return this.db().delete(fetchJobs)
  }
}

