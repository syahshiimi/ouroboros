import { deleteAllStations } from "../../../../data-access/repositories/stations/stations-repository";
import { deleteTemperatureReadingById, findLatestTemperatureReadingByStationId, findTemperatureReadingsByStationId } from "../../../../data-access/repositories/temperature/temperature-repository";
import { builder } from "../../builder";
import { TemperatureType } from "../../types";

TemperatureType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    timestamp: t.expose("timestamp", { type: "Date" }),
    reading: t.exposeString("reading"),
    file_name: t.exposeString("file_name")
  })
})

builder.queryField("findLatestTemperatureReadingByStationid", (t) =>
  t.field({
    type: TemperatureType,
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findLatestTemperatureReadingByStationId(args.station_id)
    }
  })
)

builder.queryField("findTemperatureReadingByStationid", (t) =>
  t.field({
    type: [TemperatureType],
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await findTemperatureReadingsByStationId(args.station_id)
    }
  })
)

builder.mutationField("upsertTemperatureReadings", (t) =>
  t.field({
    type: [TemperatureType],
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true }),
      reading: t.arg.string(),
      file_name: t.arg.string(),
      timestamp: t.arg({ type: 'Date', required: true })
    },
    resolve: async (_, args) => {
      return await findTemperatureReadingsByStationId(args.station_id)
    }
  })
)

builder.mutationField("deleteTemperatureReadingById", (t) =>
  t.field({
    type: TemperatureType,
    args: {
      id: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      return await deleteTemperatureReadingById(args.id)
    }
  })
)

builder.mutationField("deleteAllTemperatureReadings", (t) =>
  t.field({
    type: [TemperatureType],
    resolve: async () => {
      return await deleteAllStations();
    }
  })
)
