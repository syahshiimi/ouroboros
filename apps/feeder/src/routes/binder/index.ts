import { Workflow } from "@temporalio/client";
import { nanoid } from "nanoid";
import { temporalBinderClient } from "./client.js";
import { FeederDetails } from "@ouroboros/workflows/inputs";
import { taskQueueName } from "@ouroboros/workflows/task";

interface CreateWorkflowHandler<T extends FeederDetails> {
  workflowCallback: Workflow,
  workflowParameters: T
}

/**
  * Creates a binding to the workflow passed in as a callback function.
**/
export async function workflowBinding<T extends FeederDetails>({ workflowCallback, workflowParameters }: CreateWorkflowHandler<T>) {
  const client = await temporalBinderClient()

  return client.workflow.start(workflowCallback, {
    workflowId: workflowParameters?.topic + "-" + nanoid(),
    taskQueue: taskQueueName,
    args: [workflowParameters]
  })
}
