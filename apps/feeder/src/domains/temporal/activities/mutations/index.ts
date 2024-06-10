import {
  ZHumidityType,
  ZRainfallType,
  ZTemperatureType,
  ZUvType,
} from "@ouroboros/weather-schema";
import { chunker } from "../../utils/chunker";
import {
  weatherCoreServiceBatchUpsertHumidityReadings,
  weatherCoreServiceBatchUpsertRainfallReadings,
  weatherCoreServiceBatchUpsertStations,
  weatherCoreServiceBatchUpsertTemperatureReadings,
  weatherCoreServiceBatchUpsertUvReadings,
} from "../../../weathercore/mutations/weathercore-service";
import { unwrapStationDTO } from "../../../dto/stations/station.dto";
import { unwrapTemperatureDTO } from "../../../dto/temperature/temperature.dto";
import { unwrapHumidityDTO } from "../../../dto/humidity/humidity.dto";
import { unwrapRainfallDTO } from "../../../dto/rainfall/rainfall.dto";
import { unwrapUvDTO } from "../../../dto/uv/uv.dto";

export const createMutations = (fileName: string) => ({
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
      await weatherCoreServiceBatchUpsertStations(stations);
    } catch (error) {
      throw new Error(error as string);
    }

    try {
      const promises = chunked.map(async (chunk, index) => {
        return new Promise((resolve) => {
          console.log(`Upserting for the chunk of ${index}`);
          resolve(weatherCoreServiceBatchUpsertTemperatureReadings(chunk));
        });
      });
      await Promise.all(promises);
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
      await weatherCoreServiceBatchUpsertStations(stations);
    } catch (error) {
      throw new Error(error as string);
    }

    try {
      const promises = chunked.map(async (chunk, index) => {
        return new Promise((resolve) => {
          console.log(`Upserting for the chunk of ${index}`);
          resolve(weatherCoreServiceBatchUpsertHumidityReadings(chunk));
        });
      });
      await Promise.all(promises);
    } catch (error) {
      throw new Error(error as string);
    }
    return fileName;
  },
  async rainfallMutation(response: ZRainfallType) {
    const stations = response.metadata.stations.map((station) =>
      unwrapStationDTO(station),
    );
    const rainfall = response.items.flatMap((rainfall) =>
      unwrapRainfallDTO(rainfall, fileName),
    );
    const chunked = await chunker(rainfall, 100);

    try {
      await weatherCoreServiceBatchUpsertStations(stations);
    } catch (error) {
      throw new Error(error as string);
    }

    try {
      const promises = chunked.map(async (chunk, index) => {
        return new Promise((resolve) => {
          console.log(`Upserting for the chunk of ${index}`);
          resolve(weatherCoreServiceBatchUpsertRainfallReadings(chunk));
        });
      });
      await Promise.all(promises);
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
      const promises = chunked.map(async (chunk, index) => {
        return new Promise((resolve) => {
          console.log(`Upserting for the chunk of ${index}`);
          resolve(weatherCoreServiceBatchUpsertUvReadings(chunk));
        });
      });
      await Promise.all(promises);
    } catch (error) {
      throw new Error(error as string);
    }
    return fileName;
  },
});
