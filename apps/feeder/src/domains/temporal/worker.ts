import { NativeConnection, Worker } from "@temporalio/worker";
import { taskQueueName } from "./shared/topics.js";
import * as activities from "./activities/index.js";
import { createRequire } from "node:module";
import { temporalConnectionUrl } from "../../shared/connection/temporal.js";

const require = createRequire(import.meta.url);

async function worker() {
  const connection = await NativeConnection.connect({
    address: temporalConnectionUrl()
  })

  const worker = await Worker.create({
    connection: connection,
    namespace: "default",
    taskQueue: taskQueueName,
    workflowsPath: require.resolve('./workflow/workflow'),
    activities,
  });

  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1);
});
