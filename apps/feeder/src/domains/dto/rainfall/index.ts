import { Rainfall} from "@ouroboros/weathercore-representations";

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
 * @param dto
 */
export const unwrapRainfallDTO = (dto: RainfallDTO): Rainfall[] => {
    return dto.readings.map(reading => ({
        station_id: reading.station_id,
        timestamp: new Date(dto.timestamp),
        rainfall_value: reading.value.toString()
    }));
};