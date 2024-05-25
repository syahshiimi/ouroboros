import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activites from "../activities/activites";
import { taskQueueStore } from "./queue";
import { WorkflowInput } from "./type";


export async function workflow(input: WorkflowInput) {
  const { fetchData, storeJson } = proxyActivities<typeof activites>({
    startToCloseTimeout: '1 minute'
  })
  
  const apiTopic = taskQueueStore.topic(input.topic)

  const url = `https://api.data.gov.sg/v1/environment/${apiTopic}`

  let json;
  try {
    json = await fetchData(url, input.date)
  } catch(error) {
    throw new ApplicationFailure(`Fetching of JSON data for API topic: ${apiTopic} failed.`)
  }
  
  try {
    await storeJson(input.date, json, input.topic)
  } catch (error) {
    throw new ApplicationFailure(`Storing of JSON data for API topic: ${apiTopic} failed.`)
  }
  
  return `Successfully fetched from ${url} for the ${input.date}`
}
