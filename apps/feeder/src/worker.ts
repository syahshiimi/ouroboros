import { NativeConnection, Worker } from "@temporalio/worker";
import { createRequire } from "node:module";
import { temporalConnectionUrl } from "./shared/connection/temporal.js";
import * as activities from "@ouroboros/workflows/activities"
import { taskQueueName } from "@ouroboros/workflows/task";


const require = createRequire(import.meta.url);

async function worker() {
  const connection = await NativeConnection.connect({
    address: temporalConnectionUrl()
  })

  const worker = await Worker.create({
    connection: connection,
    namespace: "default",
    taskQueue: taskQueueName,
    workflowsPath: require.resolve('@ouroboros/workflows'),
    activities: activities,
  });

  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1);
});
