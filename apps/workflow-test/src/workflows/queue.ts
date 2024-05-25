
/**
 * Topics store, sorted in alphabetical order.
 * 
 * Key-value pair stores in a mapping of topic:api.
 */
export const topics = {
    // topic: api-topic
    temperature: "air-temperature",
    rainfall: "rainfall",
    humidity: "relative-humidity",
    uv: "uv-index",
}

export const taskQueueName = 'weather-data'