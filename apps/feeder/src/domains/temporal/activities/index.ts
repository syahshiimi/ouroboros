import { createZodFetcher } from "zod-fetch";
import { z, ZodTypeAny } from "zod";
import { zodSchema } from "../shared/zod-schema";
import { R2, S3Service } from "@ouroboros/s3-client";
import { FeederDetails } from "../workflow/input";
import {
  ZHumidityType,
  ZRainfallType,
  ZTemperatureType,
  ZUvType,
} from "@ouroboros/weather-schema";
import { createMutations } from "./mutations";
import { log } from "@temporalio/activity";
import {
  FetchJobsInput,
  TopicsEnum,
} from "@ouroboros/weathercore-representations";

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
    // console.error(`No schema found for topic: ${topic}`);
    log.error("No schema found for the topic", { topic });
    return undefined;
  }

  try {
    // console.log(`Fetching from the endpoint: ${endpoint}`);
    log.info(`Fetching for the endpoint of: ${endpoint}`, { endpoint });
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
export async function uploadR2(input: unknown, date: string, topic: string) {
  const buf = Buffer.from(JSON.stringify(input));
  const fileKey = `${date}-${topic}.json`;
  const r2Res = await R2.send(
    new S3Service.PutObjectCommand({
      Bucket: `${process.env.R2_BUCKET_NAME}`,
      Body: buf,
      Key: fileKey,
      ContentType: "application/json",
    }),
  );
  log.info(`R2 responded with the code: ${r2Res.$metadata.httpStatusCode}`, {
    r2Res,
  });
  return { r2Res, fileKey };
}

export async function updateTopicsTable<TObj>(
  fileName: string,
  topic: FeederDetails["topic"],
  response: TObj,
) {
  // Instantiate a singleton object and inject filename.
  const mutations = createMutations({ fileName, topic });
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

export async function updateFetchJobsTable(
  input: FeederDetails,
  endpoint: string,
  fileName: string,
  workflowInfo: string,
) {
  const { date, topic } = input;
  const topicCapitalised = topic.charAt(0).toUpperCase() + topic.slice(1);
  // Construct the object
  const fetchTask: FetchJobsInput = {
    data_date: date,
    fetch_url: endpoint,
    fetch_job_start_date: new Date().toISOString(),
    file_name: fileName,
    topic: TopicsEnum[topicCapitalised as keyof typeof TopicsEnum],
    workflow_id: workflowInfo,
  };

  const mutations = createMutations({ fileName });
  try {
    return await mutations.fetchJobsMutation(fetchTask);
  } catch (error) {
    throw new Error(error as string);
  }
}
