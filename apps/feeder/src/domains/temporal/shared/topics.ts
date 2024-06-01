export const availableTopics = [
    "temperature",
    "uv",
    "rainfall",
    "humidity"
] as const
    
export type AailableTopics = typeof availableTopics

/**
 * Topics store, sorted in alphabetical order.
 * Key-value pair stores in a mapping of topic:api.
 */

const topicsStore = {
    // Ordered by topic: api-topic. So please use the key.
    temperature: "air-temperature",
    rainfall: "rainfall",
    humidity: "relative-humidity",
    uv: "uv-index",
}

export const topics = {
    // topic: api-topic
    ...topicsStore,
    api: function (input: string): string {
        return topicsStore[input as keyof typeof topicsStore]
    },
    store: function (input: string): string {
        return topicsStore[input as keyof typeof topicsStore]
    }
}

export const taskQueueName = 'ouroboros-data'