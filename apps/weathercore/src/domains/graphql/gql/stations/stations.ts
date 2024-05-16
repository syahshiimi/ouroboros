import { deleteAllStations, findStationByStationId, getAllStations, upsertStationDetails } from "../../../../data-access/repositories/stations/stations-repository";
import { builder } from "../../builder";
import { StationsType } from "../../types";

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
      station_id: t.arg.string({ required: true }),
      location_name: t.arg.string(),
      longitude: t.arg.float(),
      latitude: t.arg.float()
    },
    resolve: (_, args) => {
      return upsertStationDetails([{ ...args }])
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

