import { builder } from "../../builder";
import { StationsType } from "../../types";
import { StationsRepository } from "../../../../data-access/repositories/stations/stations-repository.ts";

const stationService = await StationsRepository();

const StationsInput = builder.inputType("StationsInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    location_name: t.string({ required: true }),
    longitude: t.float({ required: true }),
    latitude: t.float({ required: true }),
  }),
});

StationsType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    location_name: t.exposeString("location_name"),
    longitude: t.exposeFloat("longitude"),
    latitude: t.exposeFloat("latitude"),
  }),
});

builder.queryField("findStationsByStationId", (t) =>
  t.field({
    type: StationsType,
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
    type: [StationsType],
    description: "Finds all stations.",
    resolve: () => {
      return stationService.getAllStations();
    },
  }),
);

builder.mutationField("upsertStation", (t) =>
  t.field({
    type: [StationsType],
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
    type: [StationsType],
    description: "Deletes all station record.",
    resolve: () => {
      return stationService.deleteAllStations();
    },
  }),
);
