import { serve } from '@hono/node-server'
import { WorkflowClient } from '@temporalio/client'
import { Hono } from 'hono'
import { feederFlow } from './domains/temporal/workflow/workflow'
import { FeederDetails } from './domains/temporal/workflow/input'
import { nanoid } from 'nanoid'
import { z } from "zod"
import { validator } from 'hono/validator'
import { taskQueueName } from './domains/temporal/shared/topics'

const app = new Hono()

const inputSchema = z.object({
  date: z.string(),
  topic: z.string()
})

app.post(
  '/workflow',
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
      args: [{date, topic}]
    })
    
    c.status(200)
    console.log(await handle.result())
    return c.json({workflowId: handle.workflowId})
  }
)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
