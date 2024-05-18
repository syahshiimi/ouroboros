import type {
  AreaForecastSchema,
  FetchJobsSchema, HumiditySchema,
  RainfallSchema, RegionSchema,
  StationSchema, TemperatureSchema,
  UvSchema
} from "./schema"

export type AreaForecast = AreaForecastSchema["$inferInsert"]
export type FetchJobs = FetchJobsSchema["$inferInsert"]
export type Humidity = HumiditySchema["$inferInsert"]
export type Rainfall = RainfallSchema["$inferInsert"]
export type Region = RegionSchema["$inferInsert"]
export type Stations = StationSchema["$inferInsert"]
export type Temperature = TemperatureSchema["$inferInsert"]
export type UV = UvSchema["$inferInsert"]
