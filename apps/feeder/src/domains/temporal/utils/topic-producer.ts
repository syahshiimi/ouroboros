import { topics } from "../shared/topics"

type ProducerInput = {
  url: string
  topic: string
}

export async function apiTopicProducer(topic: string): Promise<ProducerInput> {
  const apiTopic = topics.api(topic)
  const apiUrl = `https://api.data.gov.sg/v1/environment/${apiTopic}`
  return { url: apiUrl, topic: apiTopic }
}