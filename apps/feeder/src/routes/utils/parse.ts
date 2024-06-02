import { z } from "zod";

export async function parse<T extends z.ZodTypeAny,>(data: unknown, schema: T) {
  const parsed = schema.safeParse(data)
  const inferParsed = schema.safeParse(data) as z.infer<T>
  return {
    parsed,
    inferParsed
  }
}
