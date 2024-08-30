import { FetchJobsRepository } from "../../../repository.js";
import { InsertFetchJobs, SelectFetchJobs } from "../../models/types.js";

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

export const FetchService = new FetchJobsService(new FetchJobsRepository())
