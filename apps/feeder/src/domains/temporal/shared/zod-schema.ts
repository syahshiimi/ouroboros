import {ZHumiditySchema, ZUvSchema} from "@ouroboros/weather-types";
import {z} from "zod";

const zodSchemaStore = {
    uv: ZUvSchema.default,
    humidity: ZHumiditySchema.default
}

export const zodSchema= {
    ...zodSchemaStore,
    schemer: function <T>(input: string) {
        return this[input as keyof typeof zodSchemaStore] as z.infer<T>
    }
}