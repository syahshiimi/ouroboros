import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";
import { FeederDetails } from "./input";
import { topics } from "../shared/topics";

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
        console.log('About to greet...')
        json = await fetchData(url, input.date)
    } catch (error) {
        throw new ApplicationFailure(error as string)
    }
    
    try {
        await storeJson(input.date, json, input.topic)
    } catch (error) {
        throw new ApplicationFailure(`Storing of JSON data for topic: ${apiTopic}
        at ${input.date} with workflowId <addIdHere> failed.`)
    }
    
    return `Successfully fetched for the topic: ${input.topic} at ${input.date}`
}