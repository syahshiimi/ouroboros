import {Workflow, WorkflowClient} from "@temporalio/client";
import {nanoid} from "nanoid";
import {taskQueueName} from "../../domains/temporal/shared/topics";

interface CreateWorkflowHandler<T> {
    workflowCallback: Workflow,
    workflowParameters: T
}

export async function createWorkflowHandler<T>({ workflowCallback, workflowParameters}: CreateWorkflowHandler<T>) {
    const client = new WorkflowClient();
    const handler = await client.start(workflowCallback, {
        workflowId: nanoid(),
        taskQueue: taskQueueName,
        args: [workflowParameters]
    })
    
    return handler
}