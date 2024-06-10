/* eslint-disable */
import * as types from './graphql.js';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation BatchUpsertRainfallReadings($rainfallReadings: [RainfallInput!]!) {\n  upsertRainfallReadings(input: $rainfallReadings) {\n    station_id\n    id\n  }\n}": types.BatchUpsertRainfallReadingsDocument,
    "mutation BatchUpsertStations($stations: [StationsInput!]!) {\n  upsertStation(input: $stations) {\n    station_id\n    longitude\n    latitude\n    location_name\n  }\n}": types.BatchUpsertStationsDocument,
    "mutation BatchUpsertHumidityReadings($humidityReadings: [HumidityInput!]!) {\n  upsertHumidityReadings(input: $humidityReadings) {\n    station_id\n  }\n}": types.BatchUpsertHumidityReadingsDocument,
    "mutation BatchUpsertTemperatureReadings($temperatureReadings: [TemperatureInput!]!) {\n  upsertTemperatureReadings(input: $temperatureReadings) {\n    station_id\n    id\n  }\n}": types.BatchUpsertTemperatureReadingsDocument,
    "query GetStations {\n  getAllStations {\n    station_id\n  }\n}": types.GetStationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation BatchUpsertRainfallReadings($rainfallReadings: [RainfallInput!]!) {\n  upsertRainfallReadings(input: $rainfallReadings) {\n    station_id\n    id\n  }\n}"): (typeof documents)["mutation BatchUpsertRainfallReadings($rainfallReadings: [RainfallInput!]!) {\n  upsertRainfallReadings(input: $rainfallReadings) {\n    station_id\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation BatchUpsertStations($stations: [StationsInput!]!) {\n  upsertStation(input: $stations) {\n    station_id\n    longitude\n    latitude\n    location_name\n  }\n}"): (typeof documents)["mutation BatchUpsertStations($stations: [StationsInput!]!) {\n  upsertStation(input: $stations) {\n    station_id\n    longitude\n    latitude\n    location_name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation BatchUpsertHumidityReadings($humidityReadings: [HumidityInput!]!) {\n  upsertHumidityReadings(input: $humidityReadings) {\n    station_id\n  }\n}"): (typeof documents)["mutation BatchUpsertHumidityReadings($humidityReadings: [HumidityInput!]!) {\n  upsertHumidityReadings(input: $humidityReadings) {\n    station_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation BatchUpsertTemperatureReadings($temperatureReadings: [TemperatureInput!]!) {\n  upsertTemperatureReadings(input: $temperatureReadings) {\n    station_id\n    id\n  }\n}"): (typeof documents)["mutation BatchUpsertTemperatureReadings($temperatureReadings: [TemperatureInput!]!) {\n  upsertTemperatureReadings(input: $temperatureReadings) {\n    station_id\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStations {\n  getAllStations {\n    station_id\n  }\n}"): (typeof documents)["query GetStations {\n  getAllStations {\n    station_id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;