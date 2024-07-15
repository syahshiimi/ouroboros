import { createYoga } from "graphql-yoga";
import { schema } from "./gql/schema.ts";

export const yoga = createYoga({
  schema: schema,
});
