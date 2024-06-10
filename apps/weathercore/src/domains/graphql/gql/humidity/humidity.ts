import {
  deleteAllHumidityReadings,
  findHumidityReadingsByStationId,
  upsertHumidityReadings,
} from "../../../../data-access/repositories/humidity/humidity-repository";
import { builder } from "../../builder";
import { HumidityType } from "../../types";

const HumidityInput = builder.inputType("HumidityInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    humidity_value: t.string(),
    file_name: t.string(),
    timestamp: t.string(),
  }),
});

HumidityType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    timestamp: t.exposeString("timestamp"),
    humidity_value: t.exposeString("humidity_value"),
    file_name: t.exposeString("file_name"),
  }),
});

builder.queryField("findHumidityReadingsByStationId", (t) =>
  t.field({
    type: [HumidityType],
    description: "Finds the humidity reading by the station_id.",
    args: {
      station_id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return await findHumidityReadingsByStationId(args.station_id);
    },
  }),
);

builder.mutationField("upsertHumidityReadings", (t) =>
  t.field({
    type: [HumidityType],
    description: "Upserts the humidity reading into the table.",
    nullable: false,
    args: {
      input: t.arg({ type: [HumidityInput], required: true }),
    },
    resolve: async (_, args) => {
      return await upsertHumidityReadings([...args.input]);
    },
  }),
);

builder.mutationField("deleteHumidityReadings", (t) =>
  t.field({
    type: [HumidityType],
    description: "Deletes all humidity readings.",
    resolve: async () => {
      return await deleteAllHumidityReadings();
    },
  }),
);
