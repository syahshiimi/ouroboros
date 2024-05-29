import path from 'path';
import fs from 'fs';
import {createZodFetcher} from "zod-fetch";
import {ZHumiditySchema, ZUvSchema} from "@ouroboros/weather-types"
import {z} from "zod";
import {use} from "hono/dist/types/jsx";

export async function fetchData<T extends z.ZodTypeAny>(
  endpoint: string,
  topic: string,
): Promise<z.infer<T> | undefined> {
  const zodFetcher = createZodFetcher();

  const zodSchemaStore = {
    uv: ZUvSchema.default,
    humidity: ZHumiditySchema.default
  }

  const zodSchema= {
    ...zodSchemaStore,
    schemer: function (input: string) {
      return this[input as keyof typeof zodSchemaStore]
    }
  }

  const useThis = zodSchema.schemer(topic) as z.infer<T>

  console.log(`Fetching from the endpoint: ${endpoint}`)
  try {
    return zodFetcher(useThis, endpoint);
  } catch (error) {
    console.error(error)
  }
}

export async function storeJson(
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
  }