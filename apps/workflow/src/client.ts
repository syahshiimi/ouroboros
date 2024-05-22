import { Client, Connection } from "@temporalio/client";
import { example } from "./workflows/workflows";
import { nanoid } from 'nanoid'

async function client() {

  // Create connection for the client to the server.
  const connection = await Connection.connect({ address: 'localhost:7233' })

  const client = new Client({
    connection
  })

  // Start the workflow.
  const handle = await client.workflow.start(example, {
    taskQueue: 'hello-world',
    args: ['Temporal'],
    workflowId: 'workflow-' + nanoid()
  });

  console.log(`Started workflow ${handle.workflowId}`)

  console.log(await handle.result());
};

client().catch((error) => {
  console.log(error)
  process.exit(1)
})
