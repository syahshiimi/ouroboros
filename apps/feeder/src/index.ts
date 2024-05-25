import { serve } from '@hono/node-server'
import { WorkflowClient } from '@temporalio/client'
import { Hono } from 'hono'
import { feederFlow } from './domains/temporal/workflow/workflow'

const app = new Hono()

app.post('/start', async (c) => {
  const { name }  = await c.req.json()
  
  const client = new WorkflowClient()
  const handle = await client.start(feederFlow, {
    workflowId: "someNumber",
    taskQueue: "feeder-test",
    args: [name]
  })
  c.status(200)
  console.log(await handle.result())
  return c.json({workflowId: handle.workflowId})
  
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
