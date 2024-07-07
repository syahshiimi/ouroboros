# @ouroboros/weathercore-representations

This package is intended for the usage of GraphQL Types and Schemas on clients. The representations are typescript data structures that are represented either through

1. The GraphQL Client creating a `query` or `mutation`
2. The GraphQL Server, generates and releases a new schema or resolvers.

By design, this effectively creates a contract between the client and server components.