import {
  findFetchJobsTasksByTopic,
  findFetchJobsTaskById,
  upsertFetchJobsTask,
} from "../../../../data-access/repositories/fetch-jobs/fetch-jobs-repository";
import { builder } from "../../builder";
import { FetchJobsType } from "../../types";

const FetchJobsInput = builder.inputType("FetchJobsInput", {
  fields: (t) => ({
    topic: t.field({ type: "TableTopic", required: true }),
    data_date: t.field({ type: "Date", required: true }),
    fetch_job_start_date: t.field({ type: "Date", required: true }),
    fetch_url: t.string({ required: true }),
    file_name: t.string(),
    workflow_id: t.string({ required: true }),
  }),
});

FetchJobsType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    topic: t.expose("topic", { type: "TableTopic" }),
    data_date: t.expose("data_date", { type: "Date" }),
    fetch_job_start_date: t.expose("fetch_job_start_date", { type: "Date" }),
    fetch_url: t.exposeString("fetch_url"),
    file_name: t.exposeString("file_name"),
    workflow_id: t.exposeString("workflow_id"),
  }),
});

builder.queryField("findFetchJobsTaskById", (t) =>
  t.field({
    type: FetchJobsType,
    description: "Fetches the job tasks by id.",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await findFetchJobsTaskById(args.id);
    },
  }),
);

builder.queryField("findFetchJobsByTopic", (t) =>
  t.field({
    type: FetchJobsType,
    description: "Fetches the job tasks by the topic id",
    args: {
      topic: t.arg({ type: "TableTopic", required: true }),
    },
    resolve: async (_, args) => {
      return await findFetchJobsTasksByTopic(args.topic);
    },
  }),
);

builder.mutationField("upsertFetchJobsTask", (t) =>
  t.field({
    type: [FetchJobsType],
    description: "Upserts the fetch job task table.",
    args: {
      input: t.arg({ type: [FetchJobsInput], required: true }),
    },
    resolve: async (_, args) => {
      return await upsertFetchJobsTask([...args.input]);
    },
  }),
);
