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

export async function weatherCoreServiceBatchUpsertStations(
  variables: Stations[],
) {
  console.log("Running the batch upsert for stations...");
  return await requestClient(BatchUpsertStationsDocument, {
    stations: [...variables],
  });
}

export async function weatherCoreServiceBatchUpsertTemperatureReadings(
  variables: Temperature[],
) {
  console.log(`Running the batch upsert for temperature readings...`);
  return await requestClient(BatchUpsertTemperatureReadingsDocument, {
    temperatureReadings: [...variables],
  });
}

export async function weatherCoreServiceBatchUpsertHumidityReadings(
  variables: Humidity[],
) {
  console.log(`Running the batch upsert for humidity readings...`);
  return await requestClient(BatchUpsertHumidityReadingsDocument, {
    humidityReadings: [...variables],
  });
}

export async function weatherCoreServiceBatchUpsertRainfallReadings(
  variables: Rainfall[],
) {
  console.log(`Running the batch upsert for rainfall readings...`);
  return await requestClient(BatchUpsertRainfallReadingsDocument, {
    rainfallReadings: [...variables],
  });
}

export async function weatherCoreServiceBatchUpsertUvReadings(variables: Uv[]) {
  console.log(`Running the batch upsert for uv readings...`);
  return await requestClient(BatchUpsertUvReadingsDocument, {
    uvReadings: [...variables],
  });
}
