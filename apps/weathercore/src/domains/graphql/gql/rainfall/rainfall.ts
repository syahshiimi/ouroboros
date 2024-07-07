import { RainfallRepository } from "@ouroboros/weathercore-database/repository";
import { builder } from "../../builder";
import { InsertRainfallType, SelectRainfallType } from "../../types.ts";

const rainfallService = await RainfallRepository();

const RainfallInput = builder.inputType("RainfallInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    rainfall_value: t.string({ required: true }),
    file_name: t.string({ required: true }),
    timestamp: t.string({ required: true }),
  }),
});

SelectRainfallType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    file_name: t.exposeString("file_name"),
    timestamp: t.exposeString("timestamp"),
    rainfall_value: t.exposeString("rainfall_value"),
  }),
});

InsertRainfallType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    file_name: t.exposeString("file_name"),
    timestamp: t.exposeString("timestamp"),
    rainfall_value: t.exposeString("rainfall_value"),
  }),
});

builder.queryField("findLatestRainfallByStationId", (t) =>
  t.field({
    type: SelectRainfallType,
    description: "Finds the latest rainfall reading by station_id.",
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await rainfallService.findLatestRainfallByStationId({
        station_id: args.station_id,
      });
    },
  }),
);

builder.queryField("findRainfallByStationId", (t) =>
  t.field({
    type: [SelectRainfallType],
    description: "Finds the rainfall readings by station_id.",
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await rainfallService.findRainfallReadingsByStationId(
        args.station_id,
      );
    },
  }),
);

builder.mutationField("upsertRainfallReadings", (t) =>
  t.field({
    type: [InsertRainfallType],
    description: "Inserts the rainfall readings into the table.",
    nullable: false,
    args: {
      input: t.arg({ type: [RainfallInput], required: true }),
    },
    resolve: async (_, args) => {
      return await rainfallService.upsertRainfallReadings([...args.input]);
    },
  }),
);

builder.mutationField("deleteRainfallReadingStationId", (t) =>
  t.field({
    type: [InsertRainfallType],
    description: "Deletes the rainfall readings by station_id.",
    nullable: false,
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await rainfallService.deleteRainfallReadingByStationId(
        args.station_id,
      );
    },
  }),
);

builder.mutationField("deleteRainfallReadings", (t) =>
  t.field({
    type: [InsertRainfallType],
    description: "Deletes all rainfall readings.",
    resolve: async () => {
      return await rainfallService.deleteAllRainfallReadings();
    },
  }),
);
