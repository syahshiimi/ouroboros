import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import { FeederDetails } from "./input";
import { apiTopicProducer } from "../utils/topic-producer";
import { composer } from "../utils/url-composer";
import * as activities from "../activities";
import { zodSchema } from "../shared/zod-schema";
import {ZHumidityType, ZRainfallType, ZTemperatureType, ZUvType} from "@ouroboros/weather-schema";

export async function feederFlow(input: FeederDetails) {
  const { fetchData, uploadR2 } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
    retry: {
      maximumAttempts: 1,
    }
  })

  const { url } = await apiTopicProducer(input.topic)
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
    // Cast humidity obj. No reason not to cast here, we already validated previously.
    const mapped = (topic: FeederDetails["topic"]) => {
      switch (topic) {
          // 2. Then do the mapping here (flat or flatMap).
        case "humidity": {
          return response as ZHumidityType
        }
        case "rainfall": {
          return response as ZRainfallType
        }
        case "uv":
          return response as ZUvType;
        case "temperature": {
          return response as ZTemperatureType
        }
        default:
          break;
      }
    }
    console.log("The mapped obj:", typeof mapped(input.topic));
    // TODO: Call mutation to the topic table.

    // TODO: Update fetch_jobs table

  } catch (error) {
    throw new ApplicationFailure(error as string)
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
