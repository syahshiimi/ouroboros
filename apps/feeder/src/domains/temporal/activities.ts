import { createZodFetcher } from "zod-fetch";
import { z, ZodTypeAny } from "zod";
import { zodSchema } from "./shared/zod-schema";
import { R2, S3Service } from "@ouroboros/s3-client";
import { FeederDetails } from "./workflow/input";
import {
  ZHumidityType,
  ZRainfallType,
  ZTemperatureType,
  ZUvType,
} from "@ouroboros/weather-schema";
import { createMutations } from "./activities/mutations";

/**
 * A fetcher activity that utilises zod-fetcher library
 * for runtime validation of the schema, ensuring we don't break
 * we become aware of any breaking API contracts.
 *
 * @param endpoint
 * The API endpoint.
 * @param topic
 * The topic for fetching. Resolves and should only be used with composer.
 * @param _zSchema
 */
export async function fetchData<T extends ZodTypeAny>(
  endpoint: string,
  topic: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _zSchema: T,
): Promise<z.infer<T> | undefined> {
  const zodFetcher = createZodFetcher();
  const schema = zodSchema.schemer(topic) as unknown as z.infer<T>;

  if (!schema) {
    console.error(`No schema found for topic: ${topic}`);
    return undefined;
  }

  try {
    console.log(`Fetching from the endpoint: ${endpoint}`);
    return zodFetcher(schema, endpoint);
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 *
 * @param input
 * @param date
 * @param topic
 */
export async function uploadR2(
  input: unknown,
  date: string,
  topic: string,
): Promise<string> {
  const buf = Buffer.from(JSON.stringify(input));
  const fileKey = `${date}-${topic}.json`;
  const response = await R2.send(
    new S3Service.PutObjectCommand({
      Bucket: `${process.env.R2_BUCKET_NAME}`,
      Body: buf,
      Key: fileKey,
      ContentType: "application/json",
    }),
  );
  console.log(`R2 responded with code: ${response.$metadata.httpStatusCode}`);
  return fileKey;
}

export async function runMutation<TObj>(
  fileName: string,
  topic: FeederDetails["topic"],
  response: TObj,
) {
  // Instantiate a singleton object and inject filename.
  const mutations = createMutations(fileName);
  try {
    switch (topic) {
      case "humidity":
        return await mutations.humidityMutation(response as ZHumidityType);
      case "rainfall":
        return await mutations.rainfallMutation(response as ZRainfallType);
      case "temperature":
        return await mutations.temperatureMutation(
          response as ZTemperatureType,
        );
      case "uv":
        return await mutations.UvMutation(response as ZUvType);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
