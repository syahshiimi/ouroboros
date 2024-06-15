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

export async function feederFlow({ topic, date }: FeederDetails) {
  const { fetchData, uploadR2, updateTopicsTable, updateFetchJobsTable } =
    proxyActivities<typeof activities>({
      startToCloseTimeout: "1 minute",
      retry: {
        maximumAttempts: 1,
      },
    });

  const endpoint = await composer({ date: date, topic: topic });

  try {
    log.info(
      `About to fetch data for the date: ${date} and for the topic: ${topic}`,
    );
    const zSchema = zodSchema.schemer(topic);
    const response = await fetchData({ endpoint: endpoint, topic: topic, _zSchema: zSchema });

    if (response == undefined) {
      throw new ApplicationFailure(
        `Response is undefined. Please check if input topic: ${topic} is a valid topic with a mapped schema`,
      );
    }

    log.info(`Uploading the JSON for the topic of ${topic}...`);
    const { fileKey } = await uploadR2({ response: response, input: { date, topic } });

    log.info(`Starting batch upserts for the topic of ${topic}...`);
    const mutate = await updateTopicsTable({ fileName: fileKey, topic: topic, response });

    log.info(`Updating the fetch_jobs table.`);
    const updateRes = await updateFetchJobsTable({
      input: { topic, date },
      endpoint: endpoint,
      fileName: mutate,
      workflowInfo: workflowInfo().workflowId,
    }
    );
    log.info(`Updated the fetch_jobs table.`, { updateRes });
  } catch (error) {
    throw new ApplicationFailure(error as string);
  }

  return `Successfully fetched for the topic: ${topic} at ${date}`;
}
