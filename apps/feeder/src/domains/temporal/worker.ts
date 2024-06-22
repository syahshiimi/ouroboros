import { Worker } from "@temporalio/worker";
import { taskQueueName } from "./shared/topics.js";
import * as activities from "./activities/index.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// TODO: Create an optimised bunlder by using a pre-bundled file.
// https://github.com/temporalio/samples-typescript/blob/main/production/src/worker.ts
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
