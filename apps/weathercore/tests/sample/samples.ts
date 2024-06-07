import type { FetchJobs, Humidity, Rainfall, Stations, Temperature, UV } from "../../src/data-access/models/types";
import sample from "./temperature.json"
import humidity from "./humidity.json"
import rainfall from "./rainfall.json"
import uv from "./uv.json"

export const sampleFetchJob: FetchJobs = {
  topic_id: "9b530a5e-48dd-4714-8f93-9e49bc8f8604",
  fetch_url: "sample.url.sg",
  fetch_date: new Date(),
  fetch_job_start_date: new Date(),
  file_name: "sample_file.json",
  workflow_id: "41f196bd-31f2-4935-a863-a72e74107807"
}

export const sampleUv: UV[] = uv.items.flatMap(item =>
  item.index.map(uv => ({
    uv_index: uv.value,
    timestamp: new Date(uv.timestamp)
  }))
)

export const sampleTemperatures: Temperature[] = sample.items.flatMap(item =>
  item.readings.map(reading => ({
    station_id: reading.station_id,
    timestamp: item.timestamp,
    reading: reading.value.toString(),
    file_name: '2024-01-21-temperature.json'
  })
  )
).slice(0, (sample.items.length * 0.9))

export const sampleStations: Stations[] = sample.metadata.stations.map(station => {
  return {
    latitude: station.location.latitude,
    location_name: station.name,
    station_id: station.device_id,
    longitude: station.location.longitude
  }
})

export const sampleHumidity: Humidity[] = humidity.items.flatMap(item =>
  item.readings.map(reading => ({
    station_id: reading.station_id,
    timestamp: new Date(item.timestamp),
    humidity_value: reading.value.toString(),
    file_name: "sampleHumidity.json"
  })
  )
).slice(0, humidity.items.length * 0.5)

export const sampleRainfallStations: Stations[] = rainfall.metadata.stations.map(station => {
  return {
    latitude: station.location.latitude,
    location_name: station.name,
    station_id: station.device_id,
    longitude: station.location.longitude
  }
})

export const sampleRainfall: Rainfall[] = rainfall.items.flatMap(item =>
  item.readings.map(reading => ({
    station_id: reading.station_id,
    timestamp: new Date(item.timestamp),
    file_name: "sampleRainfall.json",
    rainfall_value: reading.value.toString()
  })
  )
).slice(0, rainfall.items.length * 0.5)

