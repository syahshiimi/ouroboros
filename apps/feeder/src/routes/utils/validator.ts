import { z } from "zod";
import {Context} from "hono";

export async function zodRequestValidator<T extends z.ZodTypeAny>(data: unknown, schema: T, context: Context) {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    context.status(400)
    return context.text(`Invalid value of ${parsed.error}`)
  }
  return parsed.data
}
