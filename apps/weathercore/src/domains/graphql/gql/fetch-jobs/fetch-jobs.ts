import { builder } from "../../builder";
import { InsertFetchJobsType, SelectFetchJobsType } from "../../types.ts";
import { topicsEnum } from "../../enums.ts";
import type { SelectFetchJobs } from "@ouroboros/weathercore-database";
import { FetchJobsRepository } from "@ouroboros/weathercore-database";

const fetchService = await FetchJobsRepository();

const FetchJobsInput = builder.inputType("FetchJobsInput", {
  fields: (t) => ({
    topic: t.field({
      type: topicsEnum,
      required: true,
      description: "The topic name.",
    }),
    data_date: t.string({
      required: true,
      description: "The corresponding date of the data in JSON file.",
    }),
    fetch_job_start_date: t.field({
      type: "Date",
      required: true,
      description: "The fetch date of the job.",
    }),
    fetch_url: t.string({
      required: true,
      description: "The URL of the API endpoint.",
    }),
    file_name: t.string({
      required: true,
      description: "The file_name of the JSON stored in the bucket.",
    }),
    workflow_id: t.string({
      required: true,
      description: "THe ID of the workflow that handled this JSON file.",
    }),
  }),
});

SelectFetchJobsType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    topic: t.expose("topic", { type: topicsEnum }),
    data_date: t.exposeString("data_date"),
    fetch_job_start_date: t.expose("fetch_job_start_date", { type: "Date" }),
    fetch_url: t.exposeString("fetch_url"),
    file_name: t.exposeString("file_name"),
    workflow_id: t.exposeString("workflow_id"),
  }),
});

builder.queryField("findFetchJobsTaskById", (t) =>
  t.field({
    type: SelectFetchJobsType,
    description: "Fetches the job tasks by id.",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await fetchService.findFetchJobsTaskById(args.id);
    },
  }),
);

builder.queryField("findFetchJobsByTopic", (t) =>
  t.field({
    type: SelectFetchJobsType,
    description: "Fetches the job tasks by the topic id",
    args: {
      topic: t.arg({ type: topicsEnum, required: true }),
    },
    resolve: async (_, args) => {
      return await fetchService.findFetchJobsTasksByTopic(
        args.topic as SelectFetchJobs["topic"],
      );
    },
  }),
);

builder.mutationField("upsertFetchJobsTask", (t) =>
  t.field({
    type: [InsertFetchJobsType],
    description: "Upserts the fetch job task table.",
    args: {
      input: t.arg({ type: [FetchJobsInput], required: true }),
    },
    resolve: async (_, args) => {
      return await fetchService.upsertFetchJobsTask([...(args.input as any)]);
    },
  }),
);
