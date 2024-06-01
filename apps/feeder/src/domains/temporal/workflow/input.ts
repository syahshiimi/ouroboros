import { z } from "zod"
import { availableTopics } from "../shared/topics"

export const requestSchema = z.object({
    date: z.string().date()
})

export const inputSchema = z.object({
    date: z.string().date(),
    topic: z.enum(availableTopics)
}).readonly()

export type RequestSchema = z.infer<typeof requestSchema>
export type FeederDetails = z.infer<typeof inputSchema>