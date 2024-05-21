import { deleteAllRainfaillReadings, deleteRainfallReadingByStationId, findLatestRainfallByStationId, findRainfallReadingsByStationId, upsertRainfallReadings } from "../../../../data-access/repositories/rainfall/rainfaill-repository";
import { builder } from "../../builder";
import { RainfallType } from "../../types";

const RainfallInput = builder.inputType("RainfallInput", {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    rainfall_value: t.string(),
    file_name: t.string(),
    timestamp: t.field({ type: "Date", required: true })
  })
})

RainfallType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    file_name: t.exposeString("file_name"),
    timestamp: t.expose("timestamp", { type: "Date" }),
    rainfall_value: t.exposeString("rainfall_value"),
  })
})

builder.queryField("findLatestRainfallByStationId", (t) =>
  t.field(({
    type: RainfallType,
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findLatestRainfallByStationId(args.station_id)
    }
  }))
)

builder.queryField("findRainfallByStationId", (t) =>
  t.field(({
    type: [RainfallType],
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findRainfallReadingsByStationId(args.station_id)
    }
  }))
)

builder.mutationField("upsertRainfallReadings", (t) =>
  t.field({
    type: [RainfallType],
    nullable: false,
    args: {
      input: t.arg({ type: [RainfallInput], required: true })
    },
    resolve: async (_, args) => {
      return await upsertRainfallReadings([...args.input])
    }
  })
)

builder.mutationField("deleteRainfallReadingStationId", (t) =>
  t.field({
    type: [RainfallType],
    nullable: false,
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await deleteRainfallReadingByStationId(args.station_id)
    }
  })
)

builder.mutationField("deleteRainfallReadings", (t) =>
  t.field({
    type: [RainfallType],
    resolve: async () => {
      return await deleteAllRainfaillReadings();
    }
  })
)

