import { Client, Connection } from "@temporalio/client";
import { nanoid } from 'nanoid'
import { workflow } from "./workflows/workflows";
import { taskQueueStore } from "./workflows/queue";
import { WorkflowInput } from "./workflows/type";

export const workflowDetails: WorkflowInput = {
  date: "2024-01-02",
  topic: "humidity"
}

async function client() {

  // Create connection for the client to the server.
  const connection = await Connection.connect({ address: 'localhost:7233' })

  const client = new Client({
    connection
  })

  // Start the workflow.
  const handle = await client.workflow.start(workflow, {
    taskQueue: taskQueueStore.queue(workflowDetails.topic),
    args: [workflowDetails],
    workflowId: 'workflow-' + nanoid()
  });

  console.log(`Started workflow ${handle.workflowId}`)

  console.log(await handle.result());
};

client().catch((error) => {
  console.log(error)
  process.exit(1)
})
