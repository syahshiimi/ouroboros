import SchemaBuilder from "@pothos/core";
import { DateTimeResolver } from "graphql-scalars";

export type SchemaType = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  DefaultFieldNullability: true;
};

const builder = new SchemaBuilder<SchemaType>({
  defaultFieldNullability: true,
});

builder.addScalarType("Date", DateTimeResolver);
builder.queryType({});
builder.mutationType({});

export { builder };
