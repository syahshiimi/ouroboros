import { MockActivityEnvironment } from "@temporalio/testing";
import { assert, beforeAll, describe, expect, it } from "vitest";
import { FeederDetails } from "../workflow/input";
import * as actitivies from "./index"
import { composer } from "../utils/composer";
import { zodSchema } from "../shared/zod-schema";


describe('ouroboros feeder activities', async () => {
  const env = new MockActivityEnvironment();
  const feederDetails: FeederDetails = {
    date: "2024-01-01",
    topic: "humidity"
  }
  const endpoint = await composer(feederDetails)
  const zSchema = zodSchema.schemer(feederDetails.topic);

  it('should fetch data from an endpoint and return a json object', async () => {
    const details: actitivies.FetchData<typeof zSchema> = {
      endpoint: endpoint,
      topic: feederDetails.topic,
      _zSchema: zSchema
    }

    const result = await env.run(actitivies.fetchData, details)
    expect(result).not.toBeNull
  })

  it('should upload to the R2 bucket', async () => {

  })

  it('should store to the topics table', async () => {

  })

  it('should update the fetch jobs table', async () => {

  })

})  
