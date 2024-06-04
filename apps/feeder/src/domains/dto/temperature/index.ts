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
 */
export const unwrapTemperatureDTO = (dto: TemperatureDTO): Temperature[] => {
    return dto.readings.map(reading => ({
        station_id: reading.station_id,
        timestamp: new Date(dto.timestamp),
        reading: reading.value.toString()
    }));
};