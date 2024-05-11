import { humidity } from "../models/humidity";
import { temperature } from "../models/temperature";
import { rainfall } from "../models/rainfall";
import { uv } from "../models/uv";
import { stations } from "../models/station";
import { createDbConnection } from "../connections/connection";
import { drizzle } from "drizzle-orm/postgres-js";

const dbConnection = createDbConnection(5)

export const stationConnection = drizzle(dbConnection, { schema: { stations}})
export const tempeatureConnection = drizzle(dbConnection, { schema: { temperature}})
export const rainfallConnection = drizzle(dbConnection, { schema: { rainfall }})
export const humidityConnection = drizzle(dbConnection, { schema: { humidity }})
export const uvConnetion = drizzle(dbConnection, { schema: { uv }})
