import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities"

async function worker() {
  // // Create connection.
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });

  // Create worker.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'feeder-test',
    workflowsPath: require.resolve('./workflow/workflow'),
    activities,
  })

  // Start accepting tasks on the task queue called 'hello-world'.
  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1)
})
