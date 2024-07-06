import { builder } from "./builder";
import type {
  InsertFetchJobs,
  InsertHumidity,
  InsertRainfall,
  InsertStations,
  InsertTemperature,
  InsertUv,
  SelectFetchJobs,
  SelectHumidity,
  SelectRainfall,
  SelectStations,
  SelectTemperature,
  SelectUV,
} from "@ouroboros/weathercore-database";

export const SelectFetchJobsType =
  builder.objectRef<SelectFetchJobs>("FetchJobs");
export const SelectHumidityType = builder.objectRef<SelectHumidity>("Humidity");
export const SelectRainfallType = builder.objectRef<SelectRainfall>("Rainfall");
export const SelectStationsType = builder.objectRef<SelectStations>("Stations");
export const SelectTemperatureType =
  builder.objectRef<SelectTemperature>("Temperature");
export const SelectUvType = builder.objectRef<SelectUV>("UV");

export const InsertFetchJobsType =
  builder.objectRef<InsertFetchJobs>("FetchJobs");
export const InsertHumidityType = builder.objectRef<InsertHumidity>("Humidity");
export const InsertRainfallType = builder.objectRef<InsertRainfall>("Rainfall");
export const InsertStationType = builder.objectRef<InsertStations>("Stations");
export const InsertTemperatureType =
  builder.objectRef<InsertTemperature>("Temperature");

export const InsertUvType = builder.objectRef<InsertUv>("UV");
