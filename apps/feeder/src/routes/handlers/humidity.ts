import { Hono } from "hono";
import { validator } from "hono/validator";
import { feederFlow } from "../../domains/temporal/workflow/workflow";
import { FeederDetails, requestSchema } from "../../domains/temporal/workflow/input";
import { workflowBinding } from "../binder/workflowBinding";
import { splitter } from "../utils/splitter";
import { z } from "zod";
import { availableTopics } from "../../domains/temporal/shared/topics";
import { parse } from "../utils/validator";

const humidity = new Hono()

humidity.get('/', (c) => {
  return c.json({
    status: 200,
    path: c.req.path
  })
})

humidity.post(
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
    // Get route path to form topic.
    const path = await splitter(c.req.path)

    // Validate the path.
    const { parsed, inferParsed } = await parse(path, z.enum(availableTopics))

    // Get validated date from context.
    const { date } = c.req.valid('json')

    if (parsed.success) {
      const parsedTopic = parsed.data as typeof inferParsed
      const handle = await workflowBinding<FeederDetails>({
        workflowCallback: feederFlow,
        workflowParameters: { date: date, topic: parsedTopic }
      })
      c.status(200)
      console.log(await handle.result())
      return c.json({ workflowId: handle.workflowId })
    }
  }
)

export default humidity
