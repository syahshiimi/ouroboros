import {
  ZHumidityType,
  ZRainfallType,
  ZTemperatureType,
  ZUvType,
} from "@ouroboros/weather-schema";
import { chunker } from "../../utils/chunker";
import { unwrapStationDTO } from "../../../dto/stations/station.dto";
import { unwrapTemperatureDTO } from "../../../dto/temperature/temperature.dto";
import { unwrapHumidityDTO } from "../../../dto/humidity/humidity.dto";
import { unwrapRainfallDTO } from "../../../dto/rainfall/rainfall.dto";
import { unwrapUvDTO } from "../../../dto/uv/uv.dto";
import { weatherCoreService } from "../../../weathercore/mutations/weathercore-service";
import { log } from "@temporalio/activity";
import { FetchJobsInput } from "@ouroboros/weathercore-representations";
import { FeederDetails } from "../../workflow/input";

interface MutationOpts {
  fileName: string;
  topic?: FeederDetails["topic"];
}

export const createMutations = ({ fileName, topic }: MutationOpts) => {
  const logger = () =>
    topic && log.info(`Running the batch upsert for ${topic}...`);
  const promiseLogger = (length: number) =>
    log.info(`Batch upsert for chunks of length: ${length} done.`, { length });

  const service = weatherCoreService(logger);

  return {
    /**
     * THe mutation for the temperature service.
     * @param response
     */
    async temperatureMutation(response: ZTemperatureType) {
      const stations = response.metadata.stations.map((station) =>
        unwrapStationDTO(station),
      );

      try {
        await service.BatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      const temperature = response.items.flatMap((temperature) =>
        unwrapTemperatureDTO(temperature, fileName),
      );
      const chunked = await chunker(temperature, 100);

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(service.BatchUpsertTemperatureReadings(chunk));
          });
        });
        await Promise.all(promises).then(() => promiseLogger(chunked.length));
      } catch (error) {
        throw new Error(error as string);
      }
      return fileName;
    },
    /**
     * Mutation for the humidity service.
     * @param response
     */
    async humidityMutation(response: ZHumidityType) {
      const stations = response.metadata.stations.map((station) =>
        unwrapStationDTO(station),
      );

      try {
        await service.BatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      const humidity = response.items.flatMap((humidity) =>
        unwrapHumidityDTO(humidity, fileName),
      );
      const chunked = await chunker(humidity, 100);

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(service.BatchUpsertHumidityReadings(chunk));
          });
        });
        await Promise.all(promises).then(() => promiseLogger(chunked.length));
      } catch (error) {
        throw new Error(error as string);
      }
      return fileName;
    },
    /**
     * Mutation for the rainfall service.
     * @param response
     */
    async rainfallMutation(response: ZRainfallType) {
      const stations = response.metadata.stations.map((station) =>
        unwrapStationDTO(station),
      );
      try {
        await service.BatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      const rainfall = response.items.flatMap((rainfall) =>
        unwrapRainfallDTO(rainfall, fileName),
      );

      const chunked = await chunker(rainfall, 100);

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(service.BatchUpsertRainfallReadings(chunk));
          });
        });
        await Promise.all(promises).then(() => promiseLogger(chunked.length));
      } catch (error) {
        throw new Error(error as string);
      }
      return fileName;
    },
    async UvMutation(response: ZUvType) {
      const lastUvElement = response.items.at(-1);
      if (!lastUvElement) {
        throw new Error("Empty array");
      }

      const result = unwrapUvDTO(lastUvElement, fileName);
      const chunked = await chunker(result, 100);

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(service.BatchUpsertUvReadings(chunk));
          });
        });
        await Promise.all(promises).then(() => promiseLogger(chunked.length));
      } catch (error) {
        throw new Error(error as string);
      }
      return fileName;
    },
    /**
    * Mutation for the Fetch Jobs table.
    **/
    async fetchJobsMutation(fetchJobs: FetchJobsInput) {
      try {
        await service.UpsertFetchJobs(fetchJobs);
      } catch (error) {
        throw new Error(error as string);
      }
      return fetchJobs.workflow_id;
    },
  };
};
