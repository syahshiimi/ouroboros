import { UVRepository } from "../../../../data-access/repositories/uv/uv-repository.ts";
import { builder } from "../../builder.ts";
import { UvType } from "../../types.ts";

const uvService = await UVRepository();

const UvInput = builder.inputType("UvInput", {
  fields: (t) => ({
    uv_index: t.int({ required: true }),
    timestamp: t.string(),
    update_timestamp: t.string(),
    file_name: t.string({ required: true }),
  }),
});

UvType.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    uv_index: t.exposeInt("uv_index"),
    timestamp: t.exposeString("timestamp"),
    update_timestamp: t.exposeString("update_timestamp"),
    file_name: t.exposeString("file_name"),
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
      return uvService.findLatestUvReadingById(args.id);
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
      return uvService.upsertUvReading([...args.input]);
    },
  }),
);

builder.mutationField("deleteAllUvReadings", (t) =>
  t.field({
    type: [UvType],
    description: "Deletes all UV readings.",
    resolve: async () => {
      return await uvService.deleteAllUvReadings();
    },
  }),
);
