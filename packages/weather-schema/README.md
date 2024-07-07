# @ouroboros/weather-schema

This is an internal package used to dynamically generate JSON schema, Zod Schemas and Type defintions that can be reused across the _apps_. 

### Generating Schema
You can follow these steps to generate the schema(s) and types, which are all encapsulated  
and abstracted in the `/utils` folder, which you may not need to care about.

1. Add in the JSON response from an endpoint.
2. Run `pnpm generate:schema` to generate the JSON schema from the JSON
3. Run `pnpm generate:zod` to generate the ZOd Schema, inferred from the JSON Schema.

## Conceptual Context
When an API is designed, we have no way to indicate or conform our API specifications to ensure behavioural expectations  
when working against it. This essentially creates a binding contract or layer, between our APIs, services and the workflow domains.

This binding contract effectively ensures not just type-safety when fetching against an external API but ensures validity in _what_ we should expect from an endpoint.