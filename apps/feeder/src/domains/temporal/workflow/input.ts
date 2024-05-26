import { z } from "zod"

export const inputSchema = z.object({
    date: z.string(),
    topic: z.string()
})

export type FeederDetails = z.infer<typeof inputSchema>