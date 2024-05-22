import { proxyActivities } from "@temporalio/workflow"
import * as activities from "../activities/activites"

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute'
})

export async function example(name: string): Promise<string> {
  return await greet(name)
}
