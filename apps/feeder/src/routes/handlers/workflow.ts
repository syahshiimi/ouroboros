import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, requestSchema } from "../../domains/temporal/workflow/input";
import { workflowBinding } from "../binder";
import { parse } from "../utils/parse";

const workflow = new Hono()

workflow.get('/', (c) => {
  return c.json({
    status: 200,
  })
})

workflow.post(
  '/',
  validator('json', async (value, c) => {
    // Validate request JSON.
    const { parsed } = await parse(value, requestSchema)
    if (!parsed.success) {
      c.status(400)
      return c.text(`Invalid value of ${parsed.error}`)
    }
    return parsed.data
  }),
  async (c) => {
    // Get validated date from context.
    const { date, topic } = c.req.valid('json')

    const handle = await workflowBinding<FeederDetails>({
      workflowCallback: feederFlow,
      workflowParameters: { date: date, topic: topic }
    })
    c.status(200)
    console.log(await handle.result())
    return c.json({
      executionRunId: handle.firstExecutionRunId,
      workflowId: handle.workflowId,
      parameters: {
        date: date,
        topic: topic
      },
    })
  }
)

export default workflow
