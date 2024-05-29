import { topics } from "../shared/topics"

type ValidateTopic = {
  url: string
  topic: string
}

export async function validateTopic(topic: string): Promise<ValidateTopic> {
  const apiTopic = topics.api(topic)

  if (apiTopic == undefined) {
    throw new Error(`Invalid topic of ${topic}`)
  }

  const apiUrl = `https://api.data.gov.sg/v1/environment/${apiTopic}`
  return { url: apiUrl, topic: apiTopic }
}
