import { Client, Connection } from "@temporalio/client";
import { temporalConnectionUrl } from "../../shared/connection/temporal.js";

/**
  * Create the temporal client with the connection object
  * by establishing a connection to the Temporal Server.
**/
async function createTemporalClient(): Promise<Client> {
  const connection = await Connection.connect({
    address: temporalConnectionUrl()
  });
  return new Client({ connection })
}

/**
  * Exports the temoral client as a singleton object.
**/
export async function temporalBinderClient(): Promise<Client> {
  return await createTemporalClient();
}
