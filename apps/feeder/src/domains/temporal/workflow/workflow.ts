import {ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { apiTopicProducer } from "../utils/topic-producer";
import { composer } from "../utils/url-composer";
import * as activities from "../activities";
import { zodSchema } from "../shared/zod-schema";
import { ZTemperatureType} from "@ouroboros/weather-schema";


export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2, temperatureMutation } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
    retry: {
      maximumAttempts: 1,
    }
  })

  // Global variables
  let fileName: string;

  const { url } = await apiTopicProducer(input.topic)
  const endpoint = await composer(url, input.date)

  // fetch from data.gov.sg
  try {
    console.log(`About to fetch data for the date: ${input.date} and for the topic: ${input.topic}`)
    const zSchema = zodSchema.schemer(input.topic)
    const response = await fetchData(endpoint, input.topic, zSchema)

    if (response == undefined) {
      throw new ApplicationFailure(`Response is undefined. Please check if input topic: ${input.topic} is a valid topic with a mapped schema`)
    }

    // Upload the JSON to R2.
    try {
      fileName = await uploadR2(response, input.date, input.topic)
    } catch (error) {
      throw new ApplicationFailure(error as string)
    }

    // Map the JSON DTO to objects and run mutations.
    try {
      if (input.topic === "temperature") {
        console.log(`Running mutation for filename: ${fileName}`)
        await temperatureMutation(input.topic, response as ZTemperatureType, fileName)
      }
    } catch (error) {
      throw new Error(error as string)
    }

    // TODO: Update fetch_jobs table
  } catch (error) {
    throw new ApplicationFailure(error as string)
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
