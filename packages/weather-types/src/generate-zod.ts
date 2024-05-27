import { jsonSchemaToZod } from "json-schema-to-zod";
import  schema  from "./json-schema/temperature-schema.json"

export const temperature = jsonSchemaToZod(schema, { module: "cjs" });
console.log(temperature)
