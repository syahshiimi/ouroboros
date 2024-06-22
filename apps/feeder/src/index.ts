import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import buckets from './routes/handlers/bucket.js'
import upload from "./routes/handlers/upload.js";
import workflow from "./routes/handlers/workflow.js";
import graphql from "./routes/handlers/graphql.js";

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
