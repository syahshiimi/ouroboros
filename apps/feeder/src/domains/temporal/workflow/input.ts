import { z } from "zod"

export const inputSchema = z.object({
    date: z.string().date(),
    topic: z.string().toLowerCase()
})

export type FeederDetails = z.infer<typeof inputSchema>