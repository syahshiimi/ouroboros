import { z } from "zod";

export async function zodRequestValidator<T extends z.ZodTypeAny>(data: unknown, schema: T) {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    c.status(400)
    return c.text(`Invalid value of ${parsed.error}`)
  }
  return parsed.data
}
