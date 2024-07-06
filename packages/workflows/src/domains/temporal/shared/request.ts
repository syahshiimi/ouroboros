import { GraphQLClient, RequestDocument } from "graphql-request";


const graphqlConnection = () => process.env.NODE_ENV === "production"
  ? process.env.GRAPHQL_ENDPOINT
  : 'localhost:3000/graphql'

export async function requestClient(
  document: RequestDocument,
  variables: NonNullable<unknown> | undefined,
) {
  const endpoint = `http://${graphqlConnection()}`;
  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await graphqlClient.request(document, { ...variables });
}
