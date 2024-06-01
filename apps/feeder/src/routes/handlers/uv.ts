import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, requestSchema } from "../../domains/temporal/workflow/input";
import { splitter } from "../utils/splitter";
import { workflowBinding } from "../binder/workflowBinding";
import { parse } from "../utils/validator";
import { availableTopics } from "../../domains/temporal/shared/topics";
import { z } from "zod";

const uv = new Hono()

uv.get('/', (c) => {
  return c.json(200)
})

uv.post(
  '/',
  validator('json', async (value, c) => {
    // Validate the incoming JSON.
    const parsed = await parse(value, requestSchema)
    if (!parsed.success) {
      c.status(400)
      return c.text(`Invalid value of ${parsed.error}`)    
    }
    return parsed.data 
   }),
  async (c) => {
    // Get route path to form topic.
    const path = await splitter(c.req.path)

    // Validate the path.
    const parsedPath = await parse(path, z.enum(availableTopics))

    // Get validated date from context.
    const { date } = c.req.valid('json')

    if (path) {
      const handle = await workflowBinding<FeederDetails>({
        workflowCallback: feederFlow,
        workflowParameters: { date: date, topic: parsedPath.data }
      })
      c.status(200)
      console.log(await handle.result())
      return c.json({ workflowId: handle.workflowId })
    }
  }
)


export default uv
