import path from 'path';
import fs from 'fs';
import {createZodFetcher} from "zod-fetch";
import {z} from "zod";
import {zodSchema} from "./shared/zod-schema";
import {ListBucketsCommand, R2} from "@ouroboros/s3-client";

export const createActivities = () => ({
  async fetchData<T extends z.ZodTypeAny>(
      endpoint: string,
      topic: string,
  ): Promise<z.infer<T> | undefined> {
    const zodFetcher = createZodFetcher();
    const schema = zodSchema.schemer(topic) as z.infer<T>

    if (!schema) {
      console.error(`No schema found for topic: ${topic}`);
      return undefined;
    }

    try {
      console.log(`Fetching from the endpoint: ${endpoint}`)
      return zodFetcher(schema, endpoint);
    } catch (error) {
      console.error(error)
    }
  },
  async storeJson(
      date: string,
      json: unknown,
      topic: string
  ) {
    console.log('Storing the JSON')

    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      console.log(`dir does not exist! Creating directory...`)
      fs.mkdirSync(dataDir)
      console.log(`${dataDir} directory made!`)
    }
    const filePath = path.join(dataDir, `${topic}-${date}.json`)
    console.log(`Storing JSON in dir: ${filePath}`)
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2))

    return `JSON successfully stored!`
  },
  async uploadR2(input: any) {
    const buf = Buffer.from(JSON.stringify(input))
    console.log(buf)
    const response = await R2.send(new ListBucketsCommand({}))
    console.log(response)
  }
})

