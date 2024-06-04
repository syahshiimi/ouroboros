import { GraphQLClient } from "graphql-request";
import { Hono } from "hono";

const graphql = new Hono();

export const GetStationsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetStations" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getAllStations" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "station_id" } }] } }] } }] } as unknown as DocumentNode<GetStationsQuery, GetStationsQueryVariables>;


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
