import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, inputSchema } from "../../domains/temporal/workflow/input";
import { createWorkflowHandler } from "../handlers/createWorkflowHandler";

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
    const parsed = inputSchema.safeParse(value)
    if (!parsed.success) {
      c.status(400)
      return c.text(`Invalid value of ${parsed.error}`)
    }
    return parsed.data
  }),
  async (c) => {
    const { date, topic } = c.req.valid('json')
    console.log(c.req.path)

    const handle = await createWorkflowHandler<FeederDetails>({
      workflowCallback: feederFlow,
      workflowParameters: { date, topic}
    })

    c.status(200)
    console.log(await handle.result())
    return c.json({ workflowId: handle.workflowId })
  }
)

export default humidity
