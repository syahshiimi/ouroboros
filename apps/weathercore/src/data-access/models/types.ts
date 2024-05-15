import type { areaForecast } from "./db/area-forecast";
import type { fetchJobs } from "./db/fetch-jobs";
import type { humidity } from "./db/humidity";
import type { rainfall } from "./db/rainfall";
import type { region } from "./db/region";
import type { stations } from "./db/station";
import type { temperature } from "./db/temperature";
import type { uv } from "./db/uv";


export type Temperature = typeof temperature.$inferInsert
export type Regions = typeof region.$inferInsert
export type Rainfall = typeof rainfall.$inferInsert
export type Stations = typeof stations.$inferInsert
export type AreaForecast = typeof areaForecast.$inferInsert
export type FetchJobs = typeof fetchJobs.$inferInsert
export type Humidity = typeof humidity.$inferInsert
export type UV = typeof uv.$inferInsert
