import { z } from "zod";
import * as ZHumiditySchema from "../_generated_/zod/humidity.zod.js";
import * as ZRainfallSchema from "../_generated_/zod/rainfall.zod.js";
import * as ZTemperatureSchema from "../_generated_/zod/temperature.zod.js";
import * as ZUvSchema from "../_generated_/zod/uv.zod.js";

export type ZHumidityType = z.infer<typeof ZHumiditySchema.default>
export type ZRainfallType = z.infer<typeof ZRainfallSchema.default>
export type ZUvType = z.infer<typeof ZUvSchema.default>
export type ZTemperatureType = z.infer<typeof ZTemperatureSchema.default>
