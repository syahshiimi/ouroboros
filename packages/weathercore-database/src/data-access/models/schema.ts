import type { areaForecast } from "./db/area-forecast.js";
import type { fetchJobs } from "./db/fetch-jobs.js";
import type { humidity } from "./db/humidity.js";
import type { rainfall } from "./db/rainfall.js";
import type { region } from "./db/region.js";
import type { stations } from "./db/station.js";
import type { temperature } from "./db/temperature.js";
import type { uv } from "./db/uv.js";

export type AreaForecastSchema = typeof areaForecast;
export type FetchJobsSchema = typeof fetchJobs;
export type HumiditySchema = typeof humidity;
export type RainfallSchema = typeof rainfall;
export type RegionSchema = typeof region;
export type StationSchema = typeof stations;
export type TemperatureSchema = typeof temperature;
export type UvSchema = typeof uv;
