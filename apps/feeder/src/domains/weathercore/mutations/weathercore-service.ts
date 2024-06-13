import { requestClient } from "../../temporal/shared/request";
import {
  BatchUpsertHumidityReadingsDocument,
  BatchUpsertRainfallReadingsDocument,
  BatchUpsertStationsDocument,
  BatchUpsertTemperatureReadingsDocument,
  BatchUpsertUvReadingsDocument,
  FetchJobsInput,
  HumidityInput,
  RainfallInput,
  StationsInput,
  TemperatureInput,
  UpsertFetchJobsDocument,
  UvInput,
} from "@ouroboros/weathercore-representations";

/**
 * weatherCore service is an object containing
 * the various async methods to perform mutation operations
 * via weatherCore to thee database.
 * @param logger
 */
export const weatherCoreService = (logger: () => void) => {
  logger();
  return {
    async BatchUpsertStations(variables: StationsInput[]) {
      return await requestClient(BatchUpsertStationsDocument, {
        stations: [...variables],
      });
    },
    async BatchUpsertTemperatureReadings(variables: TemperatureInput[]) {
      return await requestClient(BatchUpsertTemperatureReadingsDocument, {
        temperatureReadings: [...variables],
      });
    },
    async BatchUpsertHumidityReadings(variables: HumidityInput[]) {
      return await requestClient(BatchUpsertHumidityReadingsDocument, {
        humidityReadings: [...variables],
      });
    },
    async BatchUpsertRainfallReadings(variables: RainfallInput[]) {
      return await requestClient(BatchUpsertRainfallReadingsDocument, {
        rainfallReadings: [...variables],
      });
    },
    async BatchUpsertUvReadings(variables: UvInput[]) {
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
