import { Worker } from "@temporalio/worker";
import { taskQueueName } from "./shared/topics";
import * as activities from "./activities";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

async function worker() {
  const worker = await Worker.create({
    namespace: "default",
    taskQueue: taskQueueName,
    workflowsPath: require.resolve("./workflow/workflow"),
    activities,
  });

  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1);
});
