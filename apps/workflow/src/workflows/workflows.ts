import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activites from "../activities/activites";
import {  topics } from "./queue";
import { WorkflowInput } from "./type";


export async function workflow(input: WorkflowInput) {
  const { fetchData, storeJson } = proxyActivities<typeof activites>({
    startToCloseTimeout: '1 minute'
  })
  
  const apiParam = topics[input.topic]

  const url = `https://api.data.gov.sg/v1/environment/${apiParam}`

  let json;
  try {
    console.log(`Fetching from ${url}...`)
    json = await fetchData(url, input.date)
  } catch(error) {
    throw new ApplicationFailure(`Fetching of JSON data for API topic: ${apiParam} failed.`)
  }
  
  try {
    await storeJson(input.date, json, input.topic)
  } catch (error) {
    throw new ApplicationFailure(`Storing of JSON data for API topic: ${apiParam} failed.`)
  }
  
  return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}
