export const availableTopics = [
  "temperature",
  "uv",
  "rainfall",
  "humidity"
] as const

export type AvailableTopics = typeof availableTopics

/**
 * Topics store, sorted in alphabetical order.
 * Key-value pair stores in a mapping of topic:api.
 */
const apiTopics = {
  // Ordered by topic: api-topic. So please use the key.
  temperature: "air-temperature",
  rainfall: "rainfall",
  humidity: "relative-humidity",
  uv: "uv-index",
}

export const topics = {
  // topic: api-topic
  ...apiTopics,
  api: function(input: string): string {
    return apiTopics[input as keyof typeof apiTopics]
  },
}

export const taskQueueName = 'ouroboros-data'
