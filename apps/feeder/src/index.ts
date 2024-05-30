import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import buckets from './routes/bucket'
import workflowRouter from './routes/workflow'
import upload from "./routes/upload";

const app = new Hono()

// Please add the routes from ./routes here.
app.route('/workflow', workflowRouter)
app.route('/buckets', buckets)
app.route('/upload', upload)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
