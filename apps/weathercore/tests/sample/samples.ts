import type { Humidity, Stations, Temperature } from "../../src/data-access/models/types";
import sample from "./temperature.json"
import humidity from "./humidity.json"

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
    station_id: station.device_id,
    location_name: station.name,
    latitude: station.location.latitude,
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
