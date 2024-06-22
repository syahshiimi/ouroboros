import { Workflow } from "@temporalio/client";
import { nanoid } from "nanoid";
import { taskQueueName } from "../../domains/temporal/shared/topics.js";
import { FeederDetails } from "../../domains/temporal/workflow/input.js";
import { temporalBinderClient } from "./client.js";

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
