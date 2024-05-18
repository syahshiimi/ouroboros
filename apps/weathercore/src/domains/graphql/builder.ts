import SchemaBuilder from '@pothos/core'
import type { SchemaType } from './scalars';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';

const builder = new SchemaBuilder<SchemaType>({ defaultFieldNullability: true })

builder.addScalarType("Date", DateTimeResolver)
builder.queryType({})
builder.mutationType({})

export { builder };
