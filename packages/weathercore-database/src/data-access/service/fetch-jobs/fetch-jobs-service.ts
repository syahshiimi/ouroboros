import { FetchJobsRepository } from "../../../repository.js";
import { PostgresDatabase } from "../../connection/connection.js";
import { fetchJobs } from "../../models/index.js";
import { InsertFetchJobs, SelectFetchJobs } from "../../models/types.js";

/**
  *  The service layer is where we do any business logic outside of the databse operations.
  *  It is one level 'above' the repository where external interfaces can liase with.
**/
class FetchJobsService {
  constructor(private fetchJobsRepository: FetchJobsRepository) {}

  findFetchJobsById(id: string) {
    return this.fetchJobsRepository.findById(id)
  }

  findFetchJobsByTopic(topic: Exclude<SelectFetchJobs["topic"], undefined | null>) {
    return this.fetchJobsRepository.findByTopic(topic)
  }

  addOrUpdateFetchJobs(fetchTasks: InsertFetchJobs[]) {
    return this.fetchJobsRepository.upsertFetchJobsRows(fetchTasks)
  }

  deleteFetchJobsByTaskId(id: string) {
    return this.fetchJobsRepository.deleteById(id)
  }

  deleteFetchJobsRecords() {
    return this.fetchJobsRepository.delete()
  }
}

export const FetchService = new FetchJobsService(new FetchJobsRepository(new PostgresDatabase(fetchJobs)))
