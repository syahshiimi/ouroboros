
/**
 * Topics store, sorted in alphabetical order.
 * 
 * Key-value pair stores in a mapping of topic:api.
 */
export const topicsStore = {
    // topic: api-topic
    temperature: "air-temperature",
    rainfall: "rainfall",
    humidity: "relative-humidity",
    uv: "uv-index",
}

/**
 * An object that contains the [topicsStore] and also getters
 * 
 * @function queue – Method that returns a task queue based on a topic.
 * @function topic – Method that returns the value of a topicStore key.
 */
export const taskQueueStore = {
    ...topicsStore,
    /**
     * Geturns a task queue based on a topic and temporal environment.
     * @param input string
     * @returns string
     */
    queue: function (input: keyof typeof topicsStore): string {
        const env = 'dev'
        return `${input}-${env}`
    },
    /**
     * Gets the topicStore value from the key.
     * @param input string
     * @returns string
     */
    topic: function(input: keyof typeof topicsStore): string {
        return this[input]

    }
} 

console.log(taskQueueStore.queue("temperature"))
console.log(taskQueueStore.topic("humidity"))