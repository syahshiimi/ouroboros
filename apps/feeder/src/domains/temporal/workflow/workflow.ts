import { ApplicationFailure, log, proxyActivities } from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { composer } from "../utils/composer";
import * as activities from "../activities";
import { zodSchema } from "../shared/zod-schema";

export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2, runMutation } = proxyActivities<
    typeof activities
  >({
    startToCloseTimeout: "1 minute",
    retry: {
      maximumAttempts: 1,
    },
  });

  // Global variables
  let fileName: string;

  const endpoint = await composer({ date: input.date, topic: input.topic });

  // fetch from data.gov.sg
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

    // Upload the JSON to R2.
    try {
      log.info(`Uploading the JSON for the topic of ${input.topic}...`);
      fileName = await uploadR2(response, input.date, input.topic);
      console.log(`Uploading the JSON for the topic of ${input.topic} done.`);
    } catch (error) {
      throw new ApplicationFailure(error as string);
    }

    // Map the JSON DTO to objects and run mutations.
    try {
      log.info(`Starting batch upserts for the topic of ${input.topic}...`);
      await runMutation(fileName, input.topic, response);
      log.info(`Batch upserts for the topic of ${input.topic} done.`);
    } catch (error) {
      throw new Error(error as string);
    }

    // TODO: Update fetch_jobs table
  } catch (error) {
    throw new ApplicationFailure(error as string);
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`;
}
