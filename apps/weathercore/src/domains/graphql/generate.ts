import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "./gql/schema.ts";
import { writeFileSync } from "fs";
import path from "path";

(async () => {
  try {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));
    const cwd = process.cwd();
    const projectDir = [
      "..",
      "..",
      "packages",
      "weathercore-schema",
      "schema.graphql",
    ];
    const targetPath = path.join(cwd, ...projectDir);
    writeFileSync(targetPath, schemaAsString);
    console.log(
      `Schema generation with path: ${path.join(...projectDir)} completed successfully.`,
    );
  } catch (error) {
    console.error("Error generating schema:", error);
  }
})();
