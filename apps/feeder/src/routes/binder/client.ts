import { Client, Connection } from "@temporalio/client";

/**
  * Create the temporal client with the connection object
  * by establishing a connection to the Temporal Server.
**/
async function createTemporalClient(): Promise<Client> {
  const connection = await Connection.connect({
    address: String(process.env.TEMPORAL_ENDPOINT)
  });
  return new Client({ connection })
}

/**
  * Exports the temoral client as a singleton object.
**/
export async function temporalBinderClient(): Promise<Client> {
  return await createTemporalClient();
}
