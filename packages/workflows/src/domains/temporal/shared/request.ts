import { GraphQLClient, RequestDocument } from "graphql-request";

export async function requestClient(
  document: RequestDocument,
  variables: NonNullable<unknown> | undefined,
) {
  const endpoint = `http://${process.env.GRAPHQL_ENDPOINT}`;
  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await graphqlClient.request(document, { ...variables });
}
