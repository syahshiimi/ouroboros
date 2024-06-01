import { z } from "zod"

export const requestSchema = z.object({
    date: z.string().date()
})

export const inputSchema = z.object({
    date: z.string().date(),
    topic: z.string().toLowerCase()
})

export type RequestSchema = z.infer<typeof requestSchema>
export type FeederDetails = z.infer<typeof inputSchema>