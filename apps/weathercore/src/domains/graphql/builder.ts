import SchemaBuilder from '@pothos/core'
import type { SchemaType } from './scalars';
import { DateResolver } from 'graphql-scalars';

const builder = new SchemaBuilder<SchemaType>({})

builder.addScalarType("Date", DateResolver)
builder.queryType({})
builder.mutationType({})

export { builder };
