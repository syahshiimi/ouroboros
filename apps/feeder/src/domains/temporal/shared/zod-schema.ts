import {ZHumiditySchema, ZUvSchema} from "@ouroboros/weather-types";

/**
 * Store the Zod Schema generated by @ouroboros/weather-types here.
 */
export const zodSchemaStore = {
    uv: ZUvSchema.default,
    humidity: ZHumiditySchema.default
}

/**
 * Returns a zodSchema object containing both [zodSchemaStore] and a method
 * which returns the key of the [zodSchemaStore] object.
 *
 * @method schemer
 */
export const zodSchema= {
    ...zodSchemaStore,
    schemer: function (input: string) {
        return this[input as keyof typeof zodSchemaStore]
    }
}