import  * as schema  from "@ouroboros/weather-types";

export const zodSchemaStore = {
    uv: schema.ZUvSchema.default,
    humidity: schema.ZHumiditySchema.default,
    rainfall: schema.ZRainfallSchema.default,
    temperature: schema.ZTemperatureSchema.default
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