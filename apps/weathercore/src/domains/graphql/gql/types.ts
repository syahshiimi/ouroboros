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
import { builder } from "./builder.ts";

export const SelectFetchJobsType =
  builder.objectRef<SelectFetchJobs>("SelectFetchJobs");
export const SelectHumidityType =
  builder.objectRef<SelectHumidity>("SelectHumidity");
export const SelectRainfallType =
  builder.objectRef<SelectRainfall>("SelectRainfall");
export const SelectStationsType =
  builder.objectRef<SelectStations>("SelectStations");
export const SelectTemperatureType =
  builder.objectRef<SelectTemperature>("SelectTemperature");
export const SelectUvType = builder.objectRef<SelectUV>("SelectUV");

export const InsertFetchJobsType =
  builder.objectRef<InsertFetchJobs>("InsertFetchJobs");
export const InsertHumidityType =
  builder.objectRef<InsertHumidity>("InsertHumidity");
export const InsertRainfallType =
  builder.objectRef<InsertRainfall>("InsertRainfall");
export const InsertStationType =
  builder.objectRef<InsertStations>("InsertStation");
export const InsertTemperatureType =
  builder.objectRef<InsertTemperature>("InsertTemperature");

export const InsertUvType = builder.objectRef<InsertUv>("InsertUV");
