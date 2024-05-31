import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { validateTopic } from "../utils/topics-validation";
import {composer} from "../utils/url-composer";
import * as activities from "../activities";
import {zodSchema} from "../shared/zod-schema";


export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2  } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
    retry: {
      maximumAttempts: 1,
    }
  })

  const { url } = await validateTopic(input.topic)
  const endpoint = await composer(url, input.date)

  try {
    console.log(`About to fetch data for the date: ${input.date} and for the topic: ${input.topic}`)
    const zSchema = zodSchema.schemer(input.topic)
    const response = await fetchData(endpoint, input.topic, zSchema)

    if (response == undefined) {
      throw new ApplicationFailure(`Response is undefined. Please check if input topic: ${input.topic} is a valid topic with a mapped schema`)
    }

    try {
      await uploadR2(response, input.date, input.topic)
    } catch (error) {
      throw new ApplicationFailure(error as string)
    }

    // TODO: Do DTO mapping

    // TODO: Call mutation to the topic table.

    // TODO: Update fetch_jobs table

  } catch (error) {
    throw new ApplicationFailure(error as string)
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
