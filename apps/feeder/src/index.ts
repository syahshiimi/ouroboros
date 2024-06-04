import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import buckets from './routes/handlers/bucket'
import upload from "./routes/handlers/upload";
import workflow from "./routes/handlers/workflow";
import graphql from "./routes/handlers/graphql";

const app = new Hono()

// Please add the routes from ./routes here.
app.route('/workflow', workflow)
app.route('/buckets', buckets)
app.route('/upload', upload)
app.route('/graphql', graphql)

const port = 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
