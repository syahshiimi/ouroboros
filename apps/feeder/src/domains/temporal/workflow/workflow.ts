import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";
import { FeederDetails } from "./input";
import { validateTopic } from "../utils/topics-validation";
import {composer} from "../utils/url-composer";
import {ZHumiditySchema, ZUvSchema} from "@ouroboros/weather-types"

// General steps
// Fetch end point and do try-catch dance.
// Validate the JSON files
// If empty, don't store but still update the fetch_jobs table
// If not empty, store in S3
// Use DTO mapping (TBD) and use the GraphQL mutation to update db
// Update the fetch_jobs table

export async function feederFlow(input: FeederDetails) {
  const { fetchData, storeJson } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute'
  })

  const { url, topic } = await validateTopic(input.topic)
  const endpoint = await composer(url, input.date)

  try {
    console.log('About to fetch data...')
    const response = await fetchData<typeof ZHumiditySchema.default>(endpoint, input.topic)

    // TODO: Store in CLoudFlare R2 Instead
    try {
      await storeJson(input.date, response, input.topic)
    } catch (error) {
      throw new ApplicationFailure(`Storing of JSON data for topic: ${topic}
        at ${input.date} with workflowId <addIdHere> failed.`)
    }

  } catch (error) {
    throw new ApplicationFailure(error as string)
  }



  // TODO: Do DTO mapping

  // TODO: Call mutation to the topic table.

  // TODO: Update fetch_jobs table

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
