import { z } from "zod"
import { availableTopics } from "../shared/topics.js"

export const inputSchema = z.object({
  date: z.string().date(),
  topic: z.enum(availableTopics)
})

export type FeederDetails = z.infer<typeof inputSchema>
