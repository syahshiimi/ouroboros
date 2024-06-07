import { Temperature} from "@ouroboros/weathercore-representations";

/**
 * Maps the incoming JSON schema to a data transfer object.
 */
export interface TemperatureDTO {
    timestamp: string;
    readings: {
        station_id: string;
        value: number;
    }[];
}

/**
 * Converts the DTO to the weathercore domain object.
 * @param dto
 * @param fileName The filename of the json stored in the bucket.
 */
export const unwrapTemperatureDTO = (dto: TemperatureDTO, fileName: string): Temperature[] => {
    return dto.readings.map(reading => ({
        station_id: reading.station_id,
        timestamp: dto.timestamp,
        reading: reading.value.toString(),
        file_name: fileName
    }));
};