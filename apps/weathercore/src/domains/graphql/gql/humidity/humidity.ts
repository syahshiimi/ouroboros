import { HumidityRepository } from "@ouroboros/weathercore-database";
import { builder } from "../../builder";
import { InsertHumidityType, SelectHumidityType } from "../../types.ts";

const humidityService = await HumidityRepository();

const HumidityInput = builder.inputType("HumidityInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    humidity_value: t.string({ required: true }),
    file_name: t.string({ required: true }),
    timestamp: t.string({ required: true }),
  }),
});

SelectHumidityType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    timestamp: t.exposeString("timestamp"),
    humidity_value: t.exposeString("humidity_value"),
    file_name: t.exposeString("file_name"),
  }),
});

InsertHumidityType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    timestamp: t.exposeString("timestamp"),
    humidity_value: t.exposeString("humidity_value"),
    file_name: t.exposeString("file_name"),
  }),
});

const humidityService = await HumidityRepository();

builder.queryField("findHumidityReadingsByStationId", (t) =>
  t.field({
    type: [SelectHumidityType],
    description: "Finds the humidity reading by the station_id.",
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await humidityService.findHumidityReadingsByStationId(
        args.station_id,
      );
    },
  }),
);

builder.mutationField("upsertHumidityReadings", (t) =>
  t.field({
    type: [InsertHumidityType],
    description: "Upserts the humidity reading into the table.",
    nullable: false,
    args: {
      input: t.arg({ type: [HumidityInput], required: true }),
    },
    resolve: async (_, args) => {
      return await humidityService.upsertHumidityReadings([...args.input]);
    },
  }),
);

builder.mutationField("deleteHumidityReadings", (t) =>
  t.field({
    type: [InsertHumidityType],
    description: "Deletes all humidity readings.",
    resolve: async () => {
      return await humidityService.deleteAllHumidityReadings();
    },
  }),
);
