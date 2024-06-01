import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import buckets from './routes/bucket'
import upload from "./routes/upload";
import humidity from "./routes/handlers/humidity";
import uv from './routes/handlers/uv';

const app = new Hono()

// Please add the routes from ./routes here.
app.route('/workflow/uv', uv)
app.route('/workflow/humidity', humidity)
app.route('/buckets', buckets)
app.route('/upload', upload)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
