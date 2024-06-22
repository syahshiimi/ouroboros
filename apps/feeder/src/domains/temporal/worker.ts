import { NativeConnection, Worker } from "@temporalio/worker";
import { taskQueueName } from "./shared/topics.js";
import * as activities from "./activities/index.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// TODO: Create an optimised bunlder by using a pre-bundled file.
// https://github.com/temporalio/samples-typescript/blob/main/production/src/worker.ts

const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? {
      workflowBundle: {
        codePath: require.resolve('../workflow/workflow-bundle.js'),
      },
    }
    : { workflowsPath: require.resolve('./workflow/workflow') };

const temporalConnectionUrl = process.env.TEMPORAL_SERVER_ENDPOINT || 'localhost:7233'

async function worker() {
  const connection = await NativeConnection.connect({
    address: temporalConnectionUrl
  })

  const worker = await Worker.create({
    connection: connection,
    namespace: "default",
    taskQueue: taskQueueName,
    ...workflowOption(),
    // workflowsPath: require.resolve("./workflow/workflow"),
    activities,
  });

  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1);
});
