import { WorkflowClient } from "@temporalio/client";
import { Hono } from "hono";
import { validator } from "hono/validator";
import { nanoid } from "nanoid";
import { z } from "zod";
import { taskQueueName } from "../domains/temporal/shared/topics";
import { feederFlow } from "../domains/temporal/workflow/workflow";
import { inputSchema } from "../domains/temporal/workflow/input";

const workflow = new Hono()

// CRUD reference: https://www.npmjs.com/package/temporal-rest
workflow.get('/', (c) => {
  return c.json(200)
})

workflow.post(
  '/',
  validator('json', (value, c) => {
    const parsed = inputSchema.safeParse(value)
    if (!parsed.success) {
      c.status(400)
      return c.text(`Invalid value of ${parsed.error}`)
    }
    return parsed.data
  }),
  async (c) => {
    const { date, topic } = c.req.valid('json')

    const client = new WorkflowClient()
    const handle = await client.start(feederFlow, {
      workflowId: topic + '-' + nanoid(),
      taskQueue: taskQueueName,
      args: [{ date, topic }]
    })

    c.status(200)
    console.log(await handle.result())
    return c.json({ workflowId: handle.workflowId })
  }
)

export default workflow
