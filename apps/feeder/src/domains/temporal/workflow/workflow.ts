import {ApplicationFailure, proxyActivities} from "@temporalio/workflow";
import {FeederDetails} from "./input";
import {apiTopicProducer} from "../utils/topic-producer";
import {composer} from "../utils/url-composer";
import * as activities from "../activities";
import {zodSchema} from "../shared/zod-schema";
import {ZHumidityType, ZRainfallType, ZTemperatureType} from "@ouroboros/weather-schema";
import {StationDTO, unwrapStationDTO,} from "../../dto/stations";
import {TemperatureDTO, unwrapTemperatureDTO} from "../../dto/temperature";
import {HumidityDTO, unwrapHumidityDTO} from "../../dto/humidity";
import {RainfallDTO, unwrapRainfallDTO} from "../../dto/rainfall";

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
    // Reference: https://profy.dev/article/react-architecture-domain-entities-and-dtos
    // We want to abstract out the API layer and the domain layer and avoid them from being coupled.
    // The benefit of this pattern is that it allows us to add/remove fields and do transformations, if ncessary.
    // API -> DTO -> WeatherCore
    // API Layer -> Domain Transfer Layer -> Persistence Layer

    // 1. Then, run the specific un-wrap function given a topic.
    const unwrappedObject = (topic: FeederDetails["topic"]) => {
      console.log(`Unwrapping the DTO for the topic of ${topic}`)
      switch (topic) {
        case "humidity": {
          const res=  response as ZHumidityType

          // Operate on the stations.
          const stations = res.metadata.stations as StationDTO[]
          const stationData =  stations.map(station => unwrapStationDTO(station))

          const humidity = res.items as HumidityDTO[]
          const humidityObj =  humidity.flatMap((timestamp =>
              unwrapHumidityDTO(timestamp)
              ))
          return { stationData, humidityObj }
        }
        case "rainfall": {
          const res=  response as ZRainfallType

          // Operate on the stations.
          const stations = res.metadata.stations as StationDTO[]
          const stationData =  stations.map(station => unwrapStationDTO(station))

          const humidity = res.items as RainfallDTO[]
          const humidityObj =  humidity.flatMap((timestamp =>
                  unwrapRainfallDTO(timestamp)
          ))
          return { stationData, humidityObj }
        }
        case "uv":
          return null;
        case "temperature": {
          // Each operation should always map the stations.
          const castRes =  response as ZTemperatureType

          // Operate on the stations.
          const stations = castRes.metadata.stations as StationDTO[]
          const stationData =  stations.map(station => unwrapStationDTO(station))

          // Operate on the temperature readings.
          const temperatures = castRes.items as TemperatureDTO[]
          const temperatureData  = temperatures.flatMap((timestamp =>
                  unwrapTemperatureDTO(timestamp)
          ))
          return { stationData, temperatureData }
        }
        default:
          break;
      }
    }
    // TODO: Call mutation to the topic table.

    // TODO: Update fetch_jobs table

  } catch (error) {
    throw new ApplicationFailure(error as string)
  }

  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
