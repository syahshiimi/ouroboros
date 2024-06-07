import {topics} from "../shared/topics";
import {FeederDetails} from "../workflow/input";

export async function composer(input: FeederDetails): Promise<string> {
  // Get API topic, from topic.
  const apiTopic = topics.api(input.topic)

  // Append API topic to he URL.
  const apiUrl = `https://api.data.gov.sg/v1/environment/${apiTopic}`

  // Add the Search Params
  const data = new URLSearchParams();
  data.append('date', input.date)

   return `${apiUrl}?${data.toString()}`
}