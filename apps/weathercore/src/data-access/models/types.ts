import type { areaForecast } from "./area-forecast";
import type { fetchJobs } from "./fetch-jobs";
import type { humidity } from "./humidity";
import type { rainfall } from "./rainfall";
import type { region } from "./region";
import type { stations } from "./station";
import type { temperature } from "./temperature";
import type { uv } from "./uv";


export type Temperature = typeof temperature.$inferInsert
export type Regions = typeof region.$inferInsert
export type Rainfall = typeof rainfall.$inferInsert
export type Stations = typeof stations.$inferInsert
export type AreaForecast = typeof areaForecast.$inferInsert
export type FetchJobs = typeof fetchJobs.$inferInsert
export type Humidity = typeof humidity.$inferInsert
export type UV = typeof uv.$inferInsert
