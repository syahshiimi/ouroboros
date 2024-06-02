import { topics } from "../shared/topics"

type ProducerOutput = {
  url: string
  topic: string
}

/**
 * Produces the actual API topic endpoint.
 * @param topic
 */
export async function apiTopicProducer(topic: string): Promise<ProducerOutput> {
  const apiTopic = topics.api(topic)
  const apiUrl = `https://api.data.gov.sg/v1/environment/${apiTopic}`
  return { url: apiUrl, topic: apiTopic }
}