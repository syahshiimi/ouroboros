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

interface FetchData<T> {
  endpoint: string,
  topic: string,
  _zSchema: T,
}

/**
 * A fetcher activity that utilises zod-fetcher library
 * for runtime validation of the schema, ensuring we don't break
 * we become aware of any breaking API contracts.
 */
export async function fetchData<T extends ZodTypeAny>(
  {
    endpoint,
    topic,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _zSchema,
  }: FetchData<T>
): Promise<z.infer<T> | undefined> {
  const zodFetcher = createZodFetcher();
  const schema = zodSchema.schemer(topic) as unknown as z.infer<T>;

  if (!schema) {
    log.error("No schema found for the topic", { topic });
    return undefined;
  }

  try {
    log.info(`Fetching for the endpoint of: ${endpoint}`, { endpoint });
    return zodFetcher(schema, endpoint);
  } catch (error) {
    throw new Error(error as string);
  }
}

interface UploadR2 {
  response: unknown,
  input: FeederDetails
}

/**
 *
 * The activity function that uploads the JSON to the preconfigured
 * R2 Cloud Bucket.
 */
export async function uploadR2({ response, input }: UploadR2) {
  const buf = Buffer.from(JSON.stringify(response));
  const fileKey = `${input.date}-${input.topic}.json`;
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

interface UpdateTopicsTable<TObj> {
  fileName: string,
  topic: FeederDetails["topic"],
  response: TObj
}
/**
* The activiy function that maps the topics to the corresponding
* mutation.
**/
export async function updateTopicsTable<TObj>(
  {
    fileName,
    topic,
    response,
  }: UpdateTopicsTable<TObj>
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

interface UpdateFetchJobsTable {
  input: FeederDetails,
  endpoint: string,
  fileName: string,
  workflowInfo: string
}

export async function updateFetchJobsTable(
  {
    input,
    endpoint,
    fileName,
    workflowInfo,
  }: UpdateFetchJobsTable
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
