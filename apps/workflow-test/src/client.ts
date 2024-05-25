import { Client, Connection } from "@temporalio/client";
import { nanoid } from 'nanoid'
import { workflow } from "./workflows/workflows";
import { taskQueueName } from "./workflows/queue";
import { WorkflowInput } from "./workflows/type";



async function client() {

  // Create connection for the client to the server.
  const connection = await Connection.connect({ address: 'localhost:7233' })

  const client = new Client({
    connection
  })
  
  const workflowDetails: WorkflowInput = {
  date: "2024-02-04",
  topic:  "temperature"
}

  // Start the workflow.
  const handle = await client.workflow.start(workflow, {
    taskQueue: taskQueueName,
    args: [workflowDetails],
    workflowId: workflowDetails.topic + '-' + taskQueueName + '-' + nanoid()
  });

  console.log(`Started workflow "${handle.workflowId}" for taskQueue ${taskQueueName}`)

  console.log(await handle.result());
};

client().catch((error) => {
  console.log(error)
  process.exit(1)
})
