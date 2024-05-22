import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "./schema";
import { writeFileSync } from "fs";
import path from 'path';

export const generateSchemaGraphql = async () => {
  const schemaAsString = printSchema(lexicographicSortSchema(schema))
  const cwd = process.cwd();
  const targetPath = path.join(cwd, '..', '..', 'packages', 'weathercore-schema', 'schema.graphql');
  writeFileSync(targetPath, schemaAsString)
}

generateSchemaGraphql()

