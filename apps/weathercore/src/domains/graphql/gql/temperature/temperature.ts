import { TemperatureRepository } from "../../../../data-access/repositories/temperature/temperature-repository";
import { builder } from "../../builder";
import { TemperatureType } from "../../types";

const TemperatureInput = builder.inputType("TemperatureInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    reading: t.string({ required: true }),
    file_name: t.string({ required: true }),
    timestamp: t.string({ required: true }),
  }),
});

TemperatureType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    timestamp: t.exposeString("timestamp"),
    reading: t.exposeString("reading"),
    file_name: t.exposeString("file_name"),
  }),
});

const temperatureService = await TemperatureRepository();

builder.queryField("findLatestTemperatureReadingByStationid", (t) =>
  t.field({
    type: TemperatureType,
    description: "Finds the latest temperature reading by the station_id.",
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await temperatureService.findLatestTemperatureReadingByStationId(args.station_id);
    },
  }),
);

builder.queryField("findTemperatureReadingByStationid", (t) =>
  t.field({
    type: [TemperatureType],
    description: "Finds the temperature reading by the station_id.",
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await temperatureService.findTemperatureReadingsByStationId(args.station_id);
    },
  }),
);

builder.mutationField("upsertTemperatureReadings", (t) =>
  t.field({
    type: [TemperatureType],
    description: "Inserts the temperature readings into the temperature table.",
    nullable: true,
    args: {
      input: t.arg({ type: [TemperatureInput], required: true }),
    },
    resolve: async (_, args) => {
      return await temperatureService.upsertTemperatureReading([...args.input]);
    },
  }),
);

builder.mutationField("deleteTemperatureReadingById", (t) =>
  t.field({
    type: TemperatureType,
    description: "Deletes the temperature readings by id.",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await temperatureService.deleteTemperatureReadingById(args.id);
    },
  }),
);

builder.mutationField("deleteAllTemperatureReadings", (t) =>
  t.field({
    type: [TemperatureType],
    description: "Deletes all temperature readings.",
    resolve: async () => {
      return await temperatureService.deleteAllTemperatureReadings();
    },
  }),
);
