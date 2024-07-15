import sample from "./temperature.json";
import humidity from "./humidity.json";
import rainfall from "./rainfall.json";
import uv from "./uv.json";
import {
  InsertFetchJobs,
  InsertHumidity,
  InsertRainfall,
  InsertStations,
  InsertTemperature,
  InsertUv,
} from "../../src/index.js";

export const sampleFetchJob: InsertFetchJobs = {
  topic: "humidity",
  fetch_url: "sample.url.sg",
  data_date: new Date().toISOString(),
  fetch_job_start_date: new Date(),
  file_name: "sample_file.json",
  workflow_id: "41f196bd-31f2-4935-a863-a72e74107807",
};

export const sampleUv: InsertUv[] = uv.items.flatMap((item) =>
  item.index.map((uv) => ({
    uv_index: uv.value,
    timestamp: uv.timestamp,
    updated_timestamp: item.update_timestamp,
    file_name: "2024-01-21-uv.json",
  })),
);

export const sampleTemperatures: InsertTemperature[] = sample.items
  .flatMap((item) =>
    item.readings.map((reading) => ({
      station_id: reading.station_id,
      timestamp: item.timestamp,
      reading: reading.value.toString(),
      file_name: "2024-01-21-temperature.json",
    })),
  )
  .slice(0, sample.items.length * 0.9);

export const sampleStations: InsertStations[] = sample.metadata.stations.map(
  (station) => {
    return {
      latitude: station.location.latitude,
      location_name: station.name,
      station_id: station.device_id,
      longitude: station.location.longitude,
    };
  },
);

export const sampleHumidity: InsertHumidity[] = humidity.items
  .flatMap((item) =>
    item.readings.map((reading) => ({
      station_id: reading.station_id,
      timestamp: item.timestamp,
      humidity_value: reading.value.toString(),
      file_name: "sampleHumidity.json",
    })),
  )
  .slice(0, humidity.items.length * 0.5);

export const sampleRainfallStations: InsertStations[] =
  rainfall.metadata.stations.map((station) => {
    return {
      latitude: station.location.latitude,
      location_name: station.name,
      station_id: station.device_id,
      longitude: station.location.longitude,
    };
  });

export const sampleRainfall: InsertRainfall[] = rainfall.items
  .flatMap((item) =>
    item.readings.map((reading) => ({
      station_id: reading.station_id,
      timestamp: item.timestamp,
      file_name: "sampleRainfall.json",
      rainfall_value: reading.value.toString(),
    })),
  )
  .slice(0, rainfall.items.length * 0.5);
