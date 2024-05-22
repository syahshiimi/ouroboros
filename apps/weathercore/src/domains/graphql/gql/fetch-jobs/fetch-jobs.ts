import { findFetchJobsByTopicId, findFetchJobsTaskById, upsertFetchJobsTask } from "../../../../data-access/repositories/fetch-jobs/fetch-jobs-repository";
import { builder } from "../../builder";
import { FetchJobsType } from "../../types";

const FetchJobsInput = builder.inputType("FetchJobsInput", {
  fields: (t) => ({
    topic_id: t.string({ required: true }),
    fetch_date: t.field({ type: "Date", required: true }),
    fetch_job_start_date: t.field({ type: "Date", required: true }),
    fetch_url: t.string({ required: true }),
    file_name: t.string(),
    workflow_id: t.string({ required: true })
  })
})

FetchJobsType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    fetch_jobs_type_id: t.exposeID("topic_id"),
    fetch_date: t.expose("fetch_date", { type: "Date" }),
    fetch_job_start_date: t.expose("fetch_job_start_date", { type: "Date" }),
    fetch_url: t.exposeString("fetch_url"),
    file_name: t.exposeString("file_name"),
    workflow_id: t.exposeString("workflow_id")
  })
})

builder.queryField("findFetchJobsTaskById", (t) =>
  t.field({
    type: FetchJobsType,
    description: "Fetches the job tasks by id.",
    args: {
      id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findFetchJobsTaskById(args.id)
    }
  })
)

builder.queryField("findFetchJobsByFetchJobsId", (t) =>
  t.field({
    type: FetchJobsType,
    description: "Fetches the job tasks by the fetch_job id of the topic.",
    args: {
      topic_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findFetchJobsByTopicId(args.topic_id)
    }
  })
)

builder.mutationField("upsertFetchJobsTask", (t) =>
  t.field({
    type: [FetchJobsType],
    args: {
      input: t.arg({ type: [FetchJobsInput], required: true })
    },
    resolve: async (_, args) => {
      return await upsertFetchJobsTask([...args.input])
    }
  })
)
