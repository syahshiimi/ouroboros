/**
 * Topics store, sorted in alphabetical order.
 * 
 * Key-value pair stores in a mapping of topic:api.
 */

const topicsStore = {
    // Ordereed by topic: api-topic. So please use the key.
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
    },
    store: function (input: string) {
        return this[input as keyof typeof topicsStore]
    }
}

export const taskQueueName = 'ouroboros-data'