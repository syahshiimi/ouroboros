import { z } from "zod";

export async function parse<T extends z.ZodTypeAny>(data: unknown, schema: T) {
  return schema.safeParse(data)
}
