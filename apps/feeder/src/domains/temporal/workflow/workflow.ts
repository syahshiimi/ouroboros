import {
  ApplicationFailure,
  log,
  proxyActivities,
  workflowInfo,
} from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { composer } from "../utils/composer";
import * as activities from "../activities";
import { zodSchema } from "../shared/zod-schema";

export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2, updateTopicsTable, updateFetchJobsTable } =
    proxyActivities<typeof activities>({
      startToCloseTimeout: "1 minute",
      retry: {
        maximumAttempts: 1,
      },
    });

  const endpoint = await composer({ date: input.date, topic: input.topic });

  try {
    log.info(
      `About to fetch data for the date: ${input.date} and for the topic: ${input.topic}`,
    );
    const zSchema = zodSchema.schemer(input.topic);
    const response = await fetchData(endpoint, input.topic, zSchema);

    if (response == undefined) {
      throw new ApplicationFailure(
        `Response is undefined. Please check if input topic: ${input.topic} is a valid topic with a mapped schema`,
      );
    }

    log.info(`Uploading the JSON for the topic of ${input.topic}...`);
    const { fileKey } = await uploadR2(response, input.date, input.topic);

    log.info(`Starting batch upserts for the topic of ${input.topic}...`);
    const mutate = await updateTopicsTable(fileKey, input.topic, response);

    log.info(`Updating the fetch_jobs table.`);
    const workflowId = workflowInfo().workflowId;
    const updateRes = await updateFetchJobsTable(
      input,
      endpoint,
      mutate,
      workflowId,
    );
    log.info(`Updated the fetch_jobs table.`, { updateRes });
  } catch (error) {
    throw new ApplicationFailure(error as string);
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`;
}
