import { yoga } from "./src/domains/graphql/yoga";

const port = 3000;
console.log(
  `Bun GraphQL Yoga server is running at http://localhost:${port}/graphql`,
);

Bun.serve({
  fetch: yoga,
  port: port,
});
