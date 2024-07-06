import type {
  AreaForecastSchema,
  FetchJobsSchema,
  HumiditySchema,
  RainfallSchema,
  RegionSchema,
  StationSchema,
  TemperatureSchema,
  UvSchema,
} from "./schema.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectAreaForecast = InferSelectModel<AreaForecastSchema>;
export type SelectFetchJobs = InferSelectModel<FetchJobsSchema>;
export type SelectHumidity = InferSelectModel<HumiditySchema>;
export type SelectRainfall = InferSelectModel<RainfallSchema>;
export type SelectRegion = InferSelectModel<RegionSchema>;
export type SelectStations = InferSelectModel<StationSchema>;
export type SelectTemperature = InferSelectModel<TemperatureSchema>;
export type SelectUV = InferSelectModel<UvSchema>;

export type InsertAreaForecast = InferInsertModel<AreaForecastSchema>;
export type InsertFetchJobs = InferInsertModel<FetchJobsSchema>;
export type InsertHumidity = InferInsertModel<HumiditySchema>;
export type InsertRainfall = InferInsertModel<RainfallSchema>;
export type InsertRegion = InferInsertModel<RegionSchema>
export type InsertStations = InferInsertModel<StationSchema>;
export type InsertTemperature = InferInsertModel<TemperatureSchema>;
export type InsertUv = InferInsertModel<UvSchema>
