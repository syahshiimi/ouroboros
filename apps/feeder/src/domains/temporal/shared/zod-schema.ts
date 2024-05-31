import {ZHumiditySchema, ZRainfallSchema, ZTemperatureSchema, ZUvSchema} from "@ouroboros/weather-types";

export const zodSchemaStore = {
    uv: ZUvSchema.default,
    humidity: ZHumiditySchema.default,
    rainfall: ZRainfallSchema.default,
    temperature: ZTemperatureSchema.default
}

/**
 * Returns a zodSchema object containing both [zodSchemaStore] and a method
 * which returns the key of the [zodSchemaStore] object.
 *
 * @method schemer
 */
export const zodSchema= {
    ...zodSchemaStore,
    /**
     * Returns a valid Zod Schema object.
     * @param input
     */
    schemer: function (input: string) {
        return zodSchemaStore[input as keyof typeof zodSchemaStore]
    }
}