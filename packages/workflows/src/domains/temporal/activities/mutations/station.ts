import { ZTemperatureType, ZHumidityType, ZRainfallType } from "@ouroboros/weather-schema";
import { unwrapStationDTO } from "../../../dto/stations/station.dto.js";

export const mapStations = async (response: ZTemperatureType | ZHumidityType | ZRainfallType) => {
  const stations = response.metadata.stations.map((station) =>
    unwrapStationDTO(station)
  );
  return stations;
};
