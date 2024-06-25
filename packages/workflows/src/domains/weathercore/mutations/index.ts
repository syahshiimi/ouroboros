import { requestClient } from "../../temporal/shared/request.js";
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
import { DocumentNode } from "graphql/language";

/**
 * weatherCore service is an object containing
 * the various async methods to perform mutation operations
 * via weatherCore to thee database.
 * @param logger
 */
interface BatchUpsertOptions {
  document: DocumentNode;
  variableName: string;
}

export const weatherCoreService = (logger: () => void) => {
  logger();

  const batchUpsert = async <T>(
    variables: T[],
    options: BatchUpsertOptions,
  ) => {
    const { document, variableName } = options;
    const variableObject = { [variableName]: [...variables] };
    return await requestClient(document, variableObject);
  };

  return {
    async BatchUpsertStations(variables: StationsInput[]) {
      return batchUpsert(variables, {
        document: BatchUpsertStationsDocument,
        variableName: "stations",
      });
    },
    async BatchUpsertTemperatureReadings(variables: TemperatureInput[]) {
      return batchUpsert(variables, {
        document: BatchUpsertTemperatureReadingsDocument,
        variableName: "temperatureReadings",
      });
    },
    async BatchUpsertHumidityReadings(variables: HumidityInput[]) {
      return batchUpsert(variables, {
        document: BatchUpsertHumidityReadingsDocument,
        variableName: "humidityReadings",
      });
    },
    async BatchUpsertRainfallReadings(variables: RainfallInput[]) {
      return batchUpsert(variables, {
        document: BatchUpsertRainfallReadingsDocument,
        variableName: "rainfallReadings",
      });
    },
    async BatchUpsertUvReadings(variables: UvInput[]) {
      return batchUpsert(variables, {
        document: BatchUpsertUvReadingsDocument,
        variableName: "uvReadings",
      });
    },
    async UpsertFetchJobs(variables: FetchJobsInput) {
      return await requestClient(UpsertFetchJobsDocument, {
        fetchJob: variables,
      });
    },
  };
};
