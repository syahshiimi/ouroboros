import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, requestSchema } from "../../domains/temporal/workflow/input";
import { splitter } from "../utils/splitter";
import { workflowBinding } from "../binder/workflowBinding";
import { zodRequestValidator } from "../utils/validator";

const uv = new Hono()

uv.get('/', (c) => {
  return c.json(200)
})

uv.post(
  '/',
  validator('json', async (value, c) => {
    // Validate the incoming JSON.
    return await zodRequestValidator(value, requestSchema, c)
  }),
  async (c) => {
    // Get route path to form topic.
    const path = await splitter(c.req.path)

    // Get validated data.
    const { date } = c.req.valid('json')

    if (path) {
      const handle = await workflowBinding<FeederDetails>({
        workflowCallback: feederFlow,
        workflowParameters: { date: date, topic: path }
      })
      c.status(200)
      console.log(await handle.result())
      return c.json({ workflowId: handle.workflowId })
    }
  }
)


export default uv
