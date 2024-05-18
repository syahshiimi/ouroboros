import type { areaForecast } from "./db/area-forecast";
import type { fetchJobs } from "./db/fetch-jobs";
import type { humidity } from "./db/humidity";
import type { rainfall } from "./db/rainfall";
import type { region } from "./db/region";
import type { stations } from "./db/station";
import type { temperature } from "./db/temperature";
import type { uv } from "./db/uv";

export type AreaForecastSchema = typeof areaForecast
export type FetchJobsSchema = typeof fetchJobs
export type HumiditySchema = typeof humidity
export type RainfallSchema = typeof rainfall
export type RegionSchema = typeof region
export type StationSchema = typeof stations
export type TemperatureSchema = typeof temperature
export type UvSchema = typeof uv

