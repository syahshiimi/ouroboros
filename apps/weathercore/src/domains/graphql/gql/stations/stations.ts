import { deleteAllStations, findStationByStationId, getAllStations, upsertStationDetails } from "../../../../data-access/repositories/stations/stations-repository";
import { builder } from "../../builder";
import { StationsType } from "../../types";

const StationsInput = builder.inputType('StationsInput', {
  fields: (t) => ({
    station_id: t.string({ required: true }),
    location_name: t.string(),
    longitude: t.float(),
    latitude: t.float()
  })
})

StationsType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    station_id: t.exposeString("station_id"),
    location_name: t.exposeString("location_name"),
    longitude: t.exposeFloat("longitude"),
    latitude: t.exposeFloat("latitude"),
  })
})

builder.queryField("findStationsByStationId", (t) =>
  t.field({
    type: StationsType,
    nullable: true,
    args: {
      station_id: t.arg.string({ required: true })
    },
    resolve: (_, args) => {
      return findStationByStationId(args.station_id)
    }
  })
)

builder.queryField("getAllStations", (t) =>
  t.field({
    type: [StationsType],
    resolve: () => {
      return getAllStations();
    }
  })
)

builder.mutationField("upsertStation", (t) =>
  t.field({
    type: [StationsType],
    args: {
      input: t.arg({ type: [StationsInput], required: true })
    },
    resolve: (_, args) => {
      return upsertStationDetails([...args.input])
    }
  })
)

builder.mutationField("deleteAllStations", (t) =>
  t.field({
    type: [StationsType],
    resolve: () => {
      return deleteAllStations();
    }
  })
)

