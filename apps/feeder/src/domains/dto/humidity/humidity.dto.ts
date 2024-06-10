import { Humidity } from "@ouroboros/weathercore-representations";

/**
 * Maps the incoming JSON schema to a data transfer object.
 */
export interface HumidityDTO {
  timestamp: string;
  readings: {
    station_id: string;
    value: number;
  }[];
}

/**
 * Converts the DTO to the weathercore domain object.
 */
export const unwrapHumidityDTO = (
  dto: HumidityDTO,
  fileName: string,
): Humidity[] => {
  return dto.readings.map((reading) => ({
    station_id: reading.station_id,
    timestamp: dto.timestamp,
    humidity_value: reading.value.toString(),
    file_name: fileName,
  }));
};
