import { Workflow, WorkflowClient } from "@temporalio/client";
import { nanoid } from "nanoid";
import { taskQueueName } from "../../domains/temporal/shared/topics";
import { FeederDetails } from "../../domains/temporal/workflow/input";

interface CreateWorkflowHandler<T extends FeederDetails> {
  workflowCallback: Workflow,
  workflowParameters: T
}

export async function createWorkflowHandler<T extends FeederDetails>({ workflowCallback, workflowParameters }: CreateWorkflowHandler<T>) {
  const client = new WorkflowClient();
  const handler = await client.start(workflowCallback, {
    workflowId: workflowParameters?.topic + "-" + nanoid(),
    taskQueue: taskQueueName,
    args: [workflowParameters]
  })

  return handler
}
