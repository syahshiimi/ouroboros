import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, requestSchema } from "../../domains/temporal/workflow/input";
import { createWorkflowHandler } from "../utils/createWorkflowHandler";
import { splitter } from "../utils/validator";

const humidity = new Hono()

humidity.get('/', (c) => {
  return c.json({
    status: 200,
    path: c.req.path
  })
})

humidity.post(
  '/',
  validator('json', (value, c) => {
    // Validate request JSON.
    const parsed = requestSchema.safeParse(value)
    if (!parsed.success) {
      c.status(400)
      return c.text(`Invalid value of ${parsed.error}`)
    }
    return parsed.data
  }),
  async (c) => {
    // Get route path to form topic.
    const path = await splitter(c.req.path)

    // Get validated data.
    const { date } = c.req.valid('json')

    if (path) {
      const handle = await createWorkflowHandler<FeederDetails>({
        workflowCallback: feederFlow,
        workflowParameters: { date: date, topic: path }
      })
      c.status(200)
      console.log(await handle.result())
      return c.json({ workflowId: handle.workflowId })
    }
  }
)

export default humidity