import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";

export async function feederFlow(name: string) {
    const { greet } = proxyActivities<typeof activities>({
        startToCloseTimeout: '1 minute'
    })
    
    try {
        console.log('About to greet...')
        await greet(name)
    } catch (error) {
        throw new ApplicationFailure(error as string)
    }
    
    return `Success!`
}