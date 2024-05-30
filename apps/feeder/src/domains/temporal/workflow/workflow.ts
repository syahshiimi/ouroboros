import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { validateTopic } from "../utils/topics-validation";
import {composer} from "../utils/url-composer";
import {ZHumiditySchema} from "@ouroboros/weather-types"
import {createActivities} from "../activities";

export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2 } = proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: '1 minute',
    retry: {
      maximumAttempts: 1,
    }
  })

  const { url } = await validateTopic(input.topic)
  const endpoint = await composer(url, input.date)

  try {
    // Fetch the response.
    console.log('About to fetch data...')
    const response = await fetchData<typeof ZHumiditySchema.default>(endpoint, input.topic)

    if (response == undefined) {
      throw new ApplicationFailure(`Response is undefined. Please check if input topic: ${input.topic} is a valid topic with a mapped schema`)
    }

    // Store in S3
    try {
      // await storeJson(input.date, response, input.topic)
      await uploadR2(response)
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
