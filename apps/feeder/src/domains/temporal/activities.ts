import {createZodFetcher} from "zod-fetch";
import {z, ZodTypeAny} from "zod";
import {zodSchema} from "./shared/zod-schema";
import {R2, S3Service} from "@ouroboros/s3-client";
import {FeederDetails} from "./workflow/input";
import {ZTemperatureType} from "@ouroboros/weather-schema";
import {unwrapStationDTO} from "../dto/stations";
import {unwrapTemperatureDTO} from "../dto/temperature";
import {
  weatherCoreServiceBatchUpsertStations,
  weatherCoreServiceBatchUpsertTemperatureReadings
} from "../weathercore/mutations/temperature-service";
import {chunker} from "./utils/chunker";

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
export async function uploadR2(input: unknown, date: string, topic: string): Promise<string>{
  const buf = Buffer.from(JSON.stringify(input));
  const fileKey = `${date}-${topic}.json`;
  const response = await R2.send(new S3Service.PutObjectCommand({
    Bucket: `${process.env.R2_BUCKET_NAME}`,
    Body: buf,
    Key: fileKey,
    ContentType: "application/json"
  }));
  console.log(`R2 responded with code: ${response.$metadata.httpStatusCode}`);
  return fileKey;
}

export async function temperatureMutation(topic: FeederDetails["topic"], response: ZTemperatureType, fileName: string) {
  // Un-bundle the DTOs.
  const stations = response.metadata.stations.map(station => unwrapStationDTO(station))
  const temperature = response.items.flatMap(temperature => unwrapTemperatureDTO(temperature, fileName))
  const chunked = await chunker(temperature, 100)

  try {
    await weatherCoreServiceBatchUpsertStations(stations)
  } catch (error) {
    throw new Error(error as string)
  }

  try {
    const promises = chunked.map(async (chunk, index) => {
      return new Promise((resolve) => {
        console.log(`Upserting for the chunk of ${index}`)
        resolve(weatherCoreServiceBatchUpsertTemperatureReadings(chunk))
      });
    })
    await Promise.all(promises)
  } catch (error) {
    throw new Error(error as string)
  }
}