import {requestClient} from "../../temporal/shared/request";
import {
  BatchUpsertStationsDocument,
  BatchUpsertTemperatureReadingsDocument,
  Stations,
  Temperature
} from "@ouroboros/weathercore-representations";

export async function weatherCoreServiceBatchUpsertStations(variables:  Stations[]) {
  console.log('Running the batch upsert for stations...')
  return await requestClient(BatchUpsertStationsDocument,  { stations: [...variables]} )
}

export async function weatherCoreServiceBatchUpsertTemperatureReadings(variables:  Temperature[]) {
  console.log(`Running the batch upsert for temperature readings...`)
  return await requestClient(BatchUpsertTemperatureReadingsDocument,  { temperatureReadings: [...variables]} )
}