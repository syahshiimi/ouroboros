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

export const createMutations = (fileName: string, topic: string) => {
  const logger = () => console.log(`Running the batch upsert for ${topic}...`);
  const promiseLogger = (length: number) =>
    console.log(`Batch upsert for chunks of length: ${length} done.`);

  const service = weatherCoreService(logger);

  return {
    /**
     * THe mutation for the temperature service.
     * @param response
     */
    async temperatureMutation(response: ZTemperatureType) {
      // TODO: We might want to abstract out the stations object in the DTO and
      // do the mutation here instead. THis means temperature mutation no longer needs to
      // do the mapping and insertion, being single responsible in nature. This also ensures that
      // for each incoming data topic, the stations will be added first.
      const stations = response.metadata.stations.map((station) =>
        unwrapStationDTO(station),
      );
      const temperature = response.items.flatMap((temperature) =>
        unwrapTemperatureDTO(temperature, fileName),
      );
      const chunked = await chunker(temperature, 100);

      try {
        await service.weatherCoreServiceBatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(
              service.weatherCoreServiceBatchUpsertTemperatureReadings(chunk),
            );
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
      const humidity = response.items.flatMap((humidity) =>
        unwrapHumidityDTO(humidity, fileName),
      );
      const chunked = await chunker(humidity, 100);

      try {
        await service.weatherCoreServiceBatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(
              service.weatherCoreServiceBatchUpsertHumidityReadings(chunk),
            );
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
      const rainfall = response.items.flatMap((rainfall) =>
        unwrapRainfallDTO(rainfall, fileName),
      );
      const chunked = await chunker(rainfall, 100);

      try {
        await service.weatherCoreServiceBatchUpsertStations(stations);
      } catch (error) {
        throw new Error(error as string);
      }

      try {
        const promises = chunked.map(async (chunk) => {
          return new Promise((resolve) => {
            resolve(
              service.weatherCoreServiceBatchUpsertRainfallReadings(chunk),
            );
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
            resolve(service.weatherCoreServiceBatchUpsertUvReadings(chunk));
          });
        });
        await Promise.all(promises).then(() => promiseLogger(chunked.length));
      } catch (error) {
        throw new Error(error as string);
      }
      return fileName;
    },
  };
};
