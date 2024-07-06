import { builder, type SchemaType } from "./builder.ts";
import type {
  BaseEnum,
  EnumRef,
  ShapeFromEnumValues,
  ValuesFromEnum,
} from "@pothos/core";
export const topicsEnum: EnumRef<
  "topicsEnum" extends BaseEnum
    ? ValuesFromEnum<"topicsEnum">
    : ShapeFromEnumValues<
        PothosSchemaTypes.ExtendDefaultTypes<SchemaType>,
        readonly [string, string, string, string]
      >,
  "topicsEnum" extends BaseEnum
    ? ValuesFromEnum<"topicsEnum">
    : ShapeFromEnumValues<
        PothosSchemaTypes.ExtendDefaultTypes<SchemaType>,
        readonly [string, string, string, string]
      >
> = builder.enumType("topicsEnum", {
  values: ["humidity", "rainfall", "uv", "temperature"],
});
