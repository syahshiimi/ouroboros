import { requestClient } from "../../temporal/shared/request";
import {
  BatchUpsertHumidityReadingsDocument,
  BatchUpsertRainfallReadingsDocument,
  BatchUpsertStationsDocument,
  BatchUpsertTemperatureReadingsDocument,
  BatchUpsertUvReadingsDocument,
  Humidity,
  Rainfall,
  Stations,
  Temperature,
  Uv,
} from "@ouroboros/weathercore-representations";

export const weatherCoreService = (logger: () => void) => {
  logger();
  return {
    async weatherCoreServiceBatchUpsertStations(variables: Stations[]) {
      return await requestClient(BatchUpsertStationsDocument, {
        stations: [...variables],
      });
    },
    async weatherCoreServiceBatchUpsertTemperatureReadings(
      variables: Temperature[],
    ) {
      return await requestClient(BatchUpsertTemperatureReadingsDocument, {
        temperatureReadings: [...variables],
      });
    },
    async weatherCoreServiceBatchUpsertHumidityReadings(variables: Humidity[]) {
      return await requestClient(BatchUpsertHumidityReadingsDocument, {
        humidityReadings: [...variables],
      });
    },
    async weatherCoreServiceBatchUpsertRainfallReadings(variables: Rainfall[]) {
      return await requestClient(BatchUpsertRainfallReadingsDocument, {
        rainfallReadings: [...variables],
      });
    },
    async weatherCoreServiceBatchUpsertUvReadings(variables: Uv[]) {
      return await requestClient(BatchUpsertUvReadingsDocument, {
        uvReadings: [...variables],
      });
    },
  };
};
