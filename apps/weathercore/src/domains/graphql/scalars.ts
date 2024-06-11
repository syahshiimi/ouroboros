import { builder } from "./builder.ts";
import type { FetchJobs } from "../../data-access/models/types.ts";

builder.scalarType("TableTopic", {
  serialize: (n) => n,
});

export type SchemaType = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    TableTopic: {
      Input: FetchJobs["topic"];
      Output: FetchJobs["topic"];
    };
  };
  DefaultFieldNullability: true;
};
