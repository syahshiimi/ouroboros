import { Workflow } from "@temporalio/client";
import { nanoid } from "nanoid";
import { taskQueueName } from "../../domains/temporal/shared/topics";
import { FeederDetails } from "../../domains/temporal/workflow/input";
import { workflowBinderClient } from "./workflowBinderClient";

interface CreateWorkflowHandler<T extends FeederDetails> {
  workflowCallback: Workflow,
  workflowParameters: T
}
export async function workflowBinding<T extends FeederDetails>({ workflowCallback, workflowParameters }: CreateWorkflowHandler<T>) {
  return workflowBinderClient.start(workflowCallback, {
    workflowId: workflowParameters?.topic + "-" + nanoid(),
    taskQueue: taskQueueName,
    args: [workflowParameters]
  });
}
