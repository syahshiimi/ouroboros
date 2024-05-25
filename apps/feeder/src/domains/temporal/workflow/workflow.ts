import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";
import { FeederDetails } from "./input";
import { topics } from "../shared/topics";

// General steps
// Fetch end point and do try-catch dance.
// Validate the JSON files
    // If empty, don't store but still update the fetch_jobs table
// If not empty, store in S3
// Use DTO mapping (TBD) and use the GraphQL mutation to update db
// Update the fetch_jobs table

export async function feederFlow(input: FeederDetails) {
    const { fetchData, storeJson } = proxyActivities<typeof activities>({
        startToCloseTimeout: '1 minute'
    })
    
    const apiTopic =  topics.api(input.topic)
    if (apiTopic == undefined) {
        throw new ApplicationFailure(`Invalid topic of ${input.topic}`)
    }

    const url = `https://api.data.gov.sg/v1/environment/${apiTopic}`
    
    let json;
    try {
        console.log('About to fetch data...')
        json = await fetchData(url, input.date)
        // We should do schema validation here
        // 1. message = forbidden
        // 2. message = Auth token required
        // 3. Empty [items] array
    } catch (error) {
        throw new ApplicationFailure(error as string)
    }
    
    // TODO: Store in CLoudFlare R2 Instead
    try {
        await storeJson(input.date, json, input.topic)
    } catch (error) {
        throw new ApplicationFailure(`Storing of JSON data for topic: ${apiTopic}
        at ${input.date} with workflowId <addIdHere> failed.`)
    }
    
    // TODO: Do DTO mapping

    // TODO: Call mutation to the topic table.
    
    // TODO: Update fetch_jobs table
    
    return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}