/**
 * Topics store, sorted in alphabetical order.
 * 
 * Key-value pair stores in a mapping of topic:api.
 */

const topicsStore = {
    temperature: "air-temperature",
    rainfall: "rainfall",
    humidity: "relative-humidity",
    uv: "uv-index",
}

export const topics = {
    // topic: api-topic
    ...topicsStore,
    api: function (input: string) {
        return topicsStore[input as keyof typeof topicsStore]
    }
}

export const taskQueueName = 'ouroboros-data'