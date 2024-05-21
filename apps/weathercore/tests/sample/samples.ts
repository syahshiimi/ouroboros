import type { Humidity, Rainfall, Stations, Temperature } from "../../src/data-access/models/types";
import sample from "./temperature.json"
import humidity from "./humidity.json"
import rainfall from "./rainfall.json"
import { timestamp } from "drizzle-orm/mysql-core";

export const sampleTemperatures: Temperature[] = sample.items.flatMap(item =>
  item.readings.map(reading => ({
    station_id: reading.station_id,
    timestamp: new Date(item.timestamp),
    reading: reading.value.toString()
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
