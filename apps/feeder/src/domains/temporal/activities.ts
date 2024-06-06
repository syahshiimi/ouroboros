import {createZodFetcher} from "zod-fetch";
import {z, ZodTypeAny} from "zod";
import {zodSchema} from "./shared/zod-schema";
import {R2, S3Service} from "@ouroboros/s3-client";
import {
  BatchUpsertStationsDocument,
  BatchUpsertTemperatureReadingsDocument
} from "@ouroboros/weathercore-representations";
import {requestClient} from "./shared/request";
import {FeederDetails} from "./workflow/input";
import {ZTemperatureType} from "@ouroboros/weather-schema";
import {unwrapStationDTO} from "../dto/stations";
import {unwrapTemperatureDTO} from "../dto/temperature";

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
  _zSchema: T
): Promise<z.infer<T> | undefined> {
  const zodFetcher = createZodFetcher();
  const schema = zodSchema.schemer(topic) as unknown as z.infer<T>;

  if (!schema) {
    console.error(`No schema found for topic: ${topic}`);
    return undefined;
  }

  try {
    console.log(`Fetching from the endpoint: ${endpoint}`)
    return zodFetcher(schema, endpoint);
  } catch (error) {
    throw new Error(error as string)
  }
}

/**
 *
 * @param input
 * @param date
 * @param topic
 */
export async function uploadR2(input: unknown, date: string, topic: string) {
  const buf = Buffer.from(JSON.stringify(input))
  const response = await R2.send(new S3Service.PutObjectCommand({
    Bucket: `${process.env.R2_BUCKET_NAME}`,
    Body: buf,
    Key: `${date}-${topic}.json`,
    ContentType: "application/json"
  }))
  console.log(`R2 responded with code: ${response.$metadata.httpStatusCode}`)
  return response.$metadata.httpStatusCode
}

export async function temperatureMutation(topic: FeederDetails["topic"], response: ZTemperatureType) {
  // Un-bundle the DTOs.
  const stations = response.metadata.stations.map(station => unwrapStationDTO(station))
  const temperature = response.items.flatMap(temperature => unwrapTemperatureDTO(temperature))

  console.log('Running the batch upsert for stations...')
  await requestClient(BatchUpsertStationsDocument,  { stations: [...stations]} )

  console.log(`Running the batch upsert for readings of topic: ${topic}`)
  return await requestClient(BatchUpsertTemperatureReadingsDocument, {temperatureReadings: [...temperature]})
}