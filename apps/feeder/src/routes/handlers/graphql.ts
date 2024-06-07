import { GraphQLClient } from "graphql-request";
import { Hono } from "hono";
import {GetStationsDocument} from "@ouroboros/weathercore-representations";

const graphql = new Hono();
graphql.get('/', async (c) => {
  const graphqlClient = new GraphQLClient("http://localhost:3000/graphql", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await graphqlClient.request(GetStationsDocument, {})
  return c.json({ data: data })
})

export default graphql
