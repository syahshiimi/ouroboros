import { Uv } from "@ouroboros/weathercore-representations";

/**
 * Maps the incoming JSON schema to a data transfer object.
 */
export interface UvDto {
  timestamp: string;
  update_timestamp: string;
  index: {
    value: number;
    timestamp: string;
  }[];
}
export const unwrapUvDTO = (dto: UvDto, fileName: string): Uv[] => {
  return dto.index.map((uv) => ({
    update_timestamp: dto.update_timestamp,
    timestamp: uv.timestamp,
    uv_index: uv.value,
    file_name: fileName,
  }));
};
