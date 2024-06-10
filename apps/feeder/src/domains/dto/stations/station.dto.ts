import {Stations} from "@ouroboros/weathercore-representations";

/**
 * Maps the incoming JSON schema to a data transfer object.
 */
export interface StationDTO {
    name?: string,
    id: string,
    location: {
        longitude: number,
        latitude: number,
    };
}

/**
 * Converts the response DTO to a weathercore domain object.
 * @param dto
 */
export const unwrapStationDTO = (dto: StationDTO): Stations  => ({
    station_id: dto.id,
    longitude: dto.location.longitude,
    latitude: dto.location.latitude,
    location_name: dto.name
})