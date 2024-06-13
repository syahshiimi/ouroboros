import { RainfallInput } from "@ouroboros/weathercore-representations";

/**
 * Maps the incoming JSON schema to a data transfer object.
 */
export interface RainfallDTO {
  timestamp: string;
  readings: {
    station_id: string;
    value: number;
  }[];
}

/**
 * Converts the DTO to the weathercore domain object.
 */
export const unwrapRainfallDTO = (
  dto: RainfallDTO,
  fileName: string,
): RainfallInput[] => {
  return dto.readings.map((reading) => ({
    station_id: reading.station_id,
    timestamp: dto.timestamp,
    rainfall_value: reading.value.toString(),
    file_name: fileName,
  }));
};
