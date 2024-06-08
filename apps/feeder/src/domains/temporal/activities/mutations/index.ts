import { ZTemperatureType } from "@ouroboros/weather-schema";
import { unwrapStationDTO } from "../../../dto/stations";
import { unwrapTemperatureDTO } from "../../../dto/temperature";
import { chunker } from "../../utils/chunker";
import {
  weatherCoreServiceBatchUpsertStations,
  weatherCoreServiceBatchUpsertTemperatureReadings,
} from "../../../weathercore/mutations/temperature-service";

export const createMutations = (fileName: string) => ({
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
});
