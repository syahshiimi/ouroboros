import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities/activites"
import { taskQueueStore } from "./workflows/queue";
import { workflowDetails } from "./client";

async function worker() {
  // Create connection.
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });

  // Create worker.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: taskQueueStore.queue(workflowDetails.topic),
    workflowsPath: require.resolve('./workflows/workflows'),
    activities,
  })

  // Start accepting tasks on the task queue called 'hello-world'.
  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1)
})
