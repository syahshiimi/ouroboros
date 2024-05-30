import {createZodFetcher} from "zod-fetch";
import {z} from "zod";
import {zodSchema} from "./shared/zod-schema";
import {PutObjectCommand, R2} from "@ouroboros/s3-client";

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
  async uploadR2(input: unknown, date: string, topic: string) {
    const buf = Buffer.from(JSON.stringify(input))
    const response = await R2.send(new PutObjectCommand({
      Bucket: `${process.env.R2_BUCKET_NAME}`,
      Body: buf,
      Key: `${date}-${topic}.json`,
      ContentType: "application/json"
    }))
    console.log(`Responded with code: ${response.$metadata.httpStatusCode}`)
  }
})

