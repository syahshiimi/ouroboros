import { builder } from "../../builder.ts";
import { UvType } from "../../types.ts";
import {
  findLatestUvReadingById,
  upsertUvReading,
} from "../../../../data-access/repositories/uv/uv-repository.ts";

const UvInput = builder.inputType("UvInput", {
  fields: (t) => ({
    uv_index: t.int({ required: true }),
    timestamp: t.string(),
    updated_timestamp: t.string(),
    file_name: t.string({ required: true }),
  }),
});

UvType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    vu_index: t.exposeInt("uv_index"),
    timestamp: t.exposeString("timestamp"),
    updated_timestamp: t.exposeString("update_timestamp"),
  }),
});

builder.queryField("findLatestUVReadingById", (t) =>
  t.field({
    type: UvType,
    description: "Finds a latest UV readinbg by the ID",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return findLatestUvReadingById(args.id);
    },
  }),
);

builder.mutationField("upsertUvReadings", (t) =>
  t.field({
    type: [UvType],
    description: "Batch upserts UV records into the UV table",
    args: {
      input: t.arg({ type: [UvInput], required: true }),
    },
    resolve: (_, args) => {
      return upsertUvReading([...args.input]);
    },
  }),
);
