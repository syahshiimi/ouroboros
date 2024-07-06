import { StationsRepository } from "@ouroboros/weathercore-database/repository";
import { builder } from "../../builder";
import { InsertStationType, SelectStationsType } from "../../types.ts";

InsertStationType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    location_name: t.exposeString("location_name"),
    longitude: t.exposeFloat("longitude"),
    latitude: t.exposeFloat("latitude"),
  }),
});

SelectStationsType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    location_name: t.exposeString("location_name"),
    longitude: t.exposeFloat("longitude"),
    latitude: t.exposeFloat("latitude"),
  }),
});

const StationsInput = builder.inputType("StationsInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    location_name: t.string({ required: true }),
    longitude: t.float({ required: true }),
    latitude: t.float({ required: true }),
  }),
});

const stationService = await StationsRepository();

builder.queryField("findStationsByStationId", (t) =>
  t.field({
    type: SelectStationsType,
    description: "Finds a station by station_id.",
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return stationService.findStationByStationId(args.station_id);
    },
  }),
);

builder.queryField("getAllStations", (t) =>
  t.field({
    type: [SelectStationsType],
    description: "Finds all stations.",
    resolve: () => {
      return stationService.getAllStations();
    },
  }),
);

builder.mutationField("upsertStation", (t) =>
  t.field({
    type: [InsertStationType],
    description: "Inserts a station record into the stations table.",
    args: {
      input: t.arg({ type: [StationsInput], required: true }),
    },
    resolve: (_, args) => {
      return stationService.upsertStationDetails([...args.input]);
    },
  }),
);

builder.mutationField("deleteAllStations", (t) =>
  t.field({
    type: [InsertStationType],
    description: "Deletes all station record.",
    resolve: () => {
      return stationService.deleteAllStations();
    },
  }),
);
