import { requestClient } from "../../temporal/shared/request";
import {
  BatchUpsertHumidityReadingsDocument,
  BatchUpsertRainfallReadingsDocument,
  BatchUpsertStationsDocument,
  BatchUpsertTemperatureReadingsDocument,
  BatchUpsertUvReadingsDocument,
  FetchJobsInput,
  Humidity,
  Rainfall,
  Stations,
  Temperature,
  UpsertFetchJobsDocument,
  Uv,
} from "@ouroboros/weathercore-representations";

export const weatherCoreService = (logger: () => void) => {
  logger();
  return {
    async BatchUpsertStations(variables: Stations[]) {
      return await requestClient(BatchUpsertStationsDocument, {
        stations: [...variables],
      });
    },
    async BatchUpsertTemperatureReadings(variables: Temperature[]) {
      return await requestClient(BatchUpsertTemperatureReadingsDocument, {
        temperatureReadings: [...variables],
      });
    },
    async BatchUpsertHumidityReadings(variables: Humidity[]) {
      return await requestClient(BatchUpsertHumidityReadingsDocument, {
        humidityReadings: [...variables],
      });
    },
    async BatchUpsertRainfallReadings(variables: Rainfall[]) {
      return await requestClient(BatchUpsertRainfallReadingsDocument, {
        rainfallReadings: [...variables],
      });
    },
    async BatchUpsertUvReadings(variables: Uv[]) {
      return await requestClient(BatchUpsertUvReadingsDocument, {
        uvReadings: [...variables],
      });
    },
    async UpsertFetchJobs(variables: FetchJobsInput) {
      return await requestClient(UpsertFetchJobsDocument, {
        fetchJob: variables,
      });
    },
  };
};
