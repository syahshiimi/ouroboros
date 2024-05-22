import { findFetchJobsTaskByFetchJobsTypeId, findFetchJobsTaskById, upsertFetchJobsTask } from "../../../../data-access/repositories/fetch-jobs/fetch-jobs-repository";
import { builder } from "../../builder";
import { FetchJobsType } from "../../types";

const FetchJobsInput = builder.inputType("FetchJobsInput", {
  fields: (t) => ({
    fetch_jobs_type_id: t.string({ required: true }),
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
    fetch_jobs_type_id: t.exposeID("fetch_job_type_id"),
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
    args: {
      id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findFetchJobsTaskById(args.id)
    }
  })
)

builder.queryField("findFetchJObsByFetchJobsId", (t) =>
  t.field({
    type: FetchJobsType,
    args: {
      fetch_jobs_type_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findFetchJobsTaskByFetchJobsTypeId(args.fetch_jobs_type_id)
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
