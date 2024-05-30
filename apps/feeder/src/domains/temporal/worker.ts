import { Worker } from "@temporalio/worker";
import { taskQueueName } from "./shared/topics";
import {createActivities} from "./activities";
async function worker() {
  const worker = await Worker.create({
    namespace: 'default',
    taskQueue: taskQueueName,
    workflowsPath: require.resolve('./workflow/workflow'),
    activities: createActivities()
  })

  await worker.run();
}

worker().catch((err) => {
  console.error(err);
  process.exit(1)
})
