import {
  ZHumidityType,
  ZRainfallType,
  ZTemperatureType,
} from "@ouroboros/weather-schema";
import { unwrapStationDTO } from "../../../dto/stations";
import { unwrapTemperatureDTO } from "../../../dto/temperature";
import { chunker } from "../../utils/chunker";
import {
  weatherCoreServiceBatchUpsertHumidityReadings,
  weatherCoreServiceBatchUpsertRainfallReadings,
  weatherCoreServiceBatchUpsertStations,
  weatherCoreServiceBatchUpsertTemperatureReadings,
} from "../../../weathercore/mutations/weathercore-service";
import { unwrapHumidityDTO } from "../../../dto/humidity";
import { unwrapRainfallDTO } from "../../../dto/rainfall";

export const createMutations = (fileName: string) => ({
  /**
   * THe mutation for the temperature service.
   * @param response
   */
  async temperatureMutation(response: ZTemperatureType) {
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
});
