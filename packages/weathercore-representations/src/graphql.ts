/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type FetchJobs = {
  __typename?: 'FetchJobs';
  data_date?: Maybe<Scalars['String']['output']>;
  fetch_job_start_date?: Maybe<Scalars['Date']['output']>;
  fetch_url?: Maybe<Scalars['String']['output']>;
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  topic?: Maybe<TopicsEnum>;
  workflow_id?: Maybe<Scalars['String']['output']>;
};

export type FetchJobsInput = {
  /** The corresponding date of the data in JSON file. */
  data_date: Scalars['String']['input'];
  /** The fetch date of the job. */
  fetch_job_start_date: Scalars['Date']['input'];
  /** The URL of the API endpoint. */
  fetch_url: Scalars['String']['input'];
  /** The file_name of the JSON stored in the bucket. */
  file_name: Scalars['String']['input'];
  /** The topic name. */
  topic: TopicsEnum;
  /** THe ID of the workflow that handled this JSON file. */
  workflow_id: Scalars['String']['input'];
};

export type Humidity = {
  __typename?: 'Humidity';
  file_name?: Maybe<Scalars['String']['output']>;
  humidity_value?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type HumidityInput = {
  file_name: Scalars['String']['input'];
  humidity_value: Scalars['String']['input'];
  station_id: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes all station record. */
  deleteAllStations?: Maybe<Array<Stations>>;
  /** Deletes all temperature readings. */
  deleteAllTemperatureReadings?: Maybe<Array<Temperature>>;
  /** Deletes all UV readings. */
  deleteAllUvReadings?: Maybe<Array<Uv>>;
  /** Deletes all humidity readings. */
  deleteHumidityReadings?: Maybe<Array<Humidity>>;
  /** Deletes the rainfall readings by station_id. */
  deleteRainfallReadingStationId: Array<Rainfall>;
  /** Deletes all rainfall readings. */
  deleteRainfallReadings?: Maybe<Array<Rainfall>>;
  /** Deletes the temperature readings by id. */
  deleteTemperatureReadingById?: Maybe<Temperature>;
  /** Upserts the fetch job task table. */
  upsertFetchJobsTask?: Maybe<Array<FetchJobs>>;
  /** Upserts the humidity reading into the table. */
  upsertHumidityReadings: Array<Humidity>;
  /** Inserts the rainfall readings into the table. */
  upsertRainfallReadings: Array<Rainfall>;
  /** Inserts a station record into the stations table. */
  upsertStation?: Maybe<Array<Stations>>;
  /** Inserts the temperature readings into the temperature table. */
  upsertTemperatureReadings?: Maybe<Array<Temperature>>;
  /** Batch upserts UV records into the UV table */
  upsertUvReadings?: Maybe<Array<Uv>>;
};


export type MutationDeleteRainfallReadingStationIdArgs = {
  station_id: Scalars['String']['input'];
};


export type MutationDeleteTemperatureReadingByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpsertFetchJobsTaskArgs = {
  input: Array<FetchJobsInput>;
};


export type MutationUpsertHumidityReadingsArgs = {
  input: Array<HumidityInput>;
};


export type MutationUpsertRainfallReadingsArgs = {
  input: Array<RainfallInput>;
};


export type MutationUpsertStationArgs = {
  input: Array<StationsInput>;
};


export type MutationUpsertTemperatureReadingsArgs = {
  input: Array<TemperatureInput>;
};


export type MutationUpsertUvReadingsArgs = {
  input: Array<UvInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetches the job tasks by the topic id */
  findFetchJobsByTopic?: Maybe<FetchJobs>;
  /** Fetches the job tasks by id. */
  findFetchJobsTaskById?: Maybe<FetchJobs>;
  /** Finds the humidity reading by the station_id. */
  findHumidityReadingsByStationId?: Maybe<Array<Humidity>>;
  /** Finds the latest rainfall reading by station_id. */
  findLatestRainfallByStationId?: Maybe<Rainfall>;
  /** Finds the latest temperature reading by the station_id. */
  findLatestTemperatureReadingByStationid?: Maybe<Temperature>;
  /** Finds a latest UV readinbg by the ID */
  findLatestUVReadingById?: Maybe<Uv>;
  /** Finds the rainfall readings by station_id. */
  findRainfallByStationId?: Maybe<Array<Rainfall>>;
  /** Finds a station by station_id. */
  findStationsByStationId?: Maybe<Stations>;
  /** Finds the temperature reading by the station_id. */
  findTemperatureReadingByStationid?: Maybe<Array<Temperature>>;
  /** Finds all stations. */
  getAllStations?: Maybe<Array<Stations>>;
};


export type QueryFindFetchJobsByTopicArgs = {
  topic: TopicsEnum;
};


export type QueryFindFetchJobsTaskByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindHumidityReadingsByStationIdArgs = {
  station_id: Scalars['String']['input'];
};


export type QueryFindLatestRainfallByStationIdArgs = {
  station_id: Scalars['String']['input'];
};


export type QueryFindLatestTemperatureReadingByStationidArgs = {
  station_id: Scalars['String']['input'];
};


export type QueryFindLatestUvReadingByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindRainfallByStationIdArgs = {
  station_id: Scalars['String']['input'];
};


export type QueryFindStationsByStationIdArgs = {
  station_id: Scalars['String']['input'];
};


export type QueryFindTemperatureReadingByStationidArgs = {
  station_id: Scalars['String']['input'];
};

export type Rainfall = {
  __typename?: 'Rainfall';
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rainfall_value?: Maybe<Scalars['String']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type RainfallInput = {
  file_name: Scalars['String']['input'];
  rainfall_value: Scalars['String']['input'];
  station_id: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
};

export type Stations = {
  __typename?: 'Stations';
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  location_name?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
};

export type StationsInput = {
  latitude: Scalars['Float']['input'];
  location_name: Scalars['String']['input'];
  longitude: Scalars['Float']['input'];
  station_id: Scalars['String']['input'];
};

export type Temperature = {
  __typename?: 'Temperature';
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reading?: Maybe<Scalars['String']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type TemperatureInput = {
  file_name: Scalars['String']['input'];
  reading: Scalars['String']['input'];
  station_id: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
};

export type Uv = {
  __typename?: 'UV';
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  update_timestamp?: Maybe<Scalars['String']['output']>;
  uv_index?: Maybe<Scalars['Int']['output']>;
};

export type UvInput = {
  file_name: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['String']['input']>;
  update_timestamp?: InputMaybe<Scalars['String']['input']>;
  uv_index: Scalars['Int']['input'];
};

export enum TopicsEnum {
  Humidity = 'humidity',
  Rainfall = 'rainfall',
  Temperature = 'temperature',
  Uv = 'uv'
}

export type BatchUpsertStationsMutationVariables = Exact<{
  stations: Array<StationsInput> | StationsInput;
}>;


export type BatchUpsertStationsMutation = { __typename?: 'Mutation', upsertStation?: Array<{ __typename?: 'Stations', station_id?: string | null, longitude?: number | null, latitude?: number | null, location_name?: string | null }> | null };

export type UpsertFetchJobsMutationVariables = Exact<{
  fetchJob: Array<FetchJobsInput> | FetchJobsInput;
}>;


export type UpsertFetchJobsMutation = { __typename?: 'Mutation', upsertFetchJobsTask?: Array<{ __typename?: 'FetchJobs', id?: string | null }> | null };

export type BatchUpsertHumidityReadingsMutationVariables = Exact<{
  humidityReadings: Array<HumidityInput> | HumidityInput;
}>;


export type BatchUpsertHumidityReadingsMutation = { __typename?: 'Mutation', upsertHumidityReadings: Array<{ __typename?: 'Humidity', station_id?: string | null }> };

export type BatchUpsertRainfallReadingsMutationVariables = Exact<{
  rainfallReadings: Array<RainfallInput> | RainfallInput;
}>;


export type BatchUpsertRainfallReadingsMutation = { __typename?: 'Mutation', upsertRainfallReadings: Array<{ __typename?: 'Rainfall', station_id?: string | null, id?: string | null }> };

export type BatchUpsertTemperatureReadingsMutationVariables = Exact<{
  temperatureReadings: Array<TemperatureInput> | TemperatureInput;
}>;


export type BatchUpsertTemperatureReadingsMutation = { __typename?: 'Mutation', upsertTemperatureReadings?: Array<{ __typename?: 'Temperature', station_id?: string | null, id?: string | null }> | null };

export type BatchUpsertUvReadingsMutationVariables = Exact<{
  uvReadings: Array<UvInput> | UvInput;
}>;


export type BatchUpsertUvReadingsMutation = { __typename?: 'Mutation', upsertUvReadings?: Array<{ __typename?: 'UV', timestamp?: string | null, update_timestamp?: string | null, uv_index?: number | null }> | null };

export type GetStationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStationsQuery = { __typename?: 'Query', getAllStations?: Array<{ __typename?: 'Stations', station_id?: string | null }> | null };


export const BatchUpsertStationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BatchUpsertStations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stations"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StationsInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertStation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stations"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"location_name"}}]}}]}}]} as unknown as DocumentNode<BatchUpsertStationsMutation, BatchUpsertStationsMutationVariables>;
export const UpsertFetchJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertFetchJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fetchJob"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchJobsInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertFetchJobsTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fetchJob"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertFetchJobsMutation, UpsertFetchJobsMutationVariables>;
export const BatchUpsertHumidityReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BatchUpsertHumidityReadings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"humidityReadings"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HumidityInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertHumidityReadings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"humidityReadings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}}]}}]}}]} as unknown as DocumentNode<BatchUpsertHumidityReadingsMutation, BatchUpsertHumidityReadingsMutationVariables>;
export const BatchUpsertRainfallReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BatchUpsertRainfallReadings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rainfallReadings"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RainfallInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertRainfallReadings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rainfallReadings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchUpsertRainfallReadingsMutation, BatchUpsertRainfallReadingsMutationVariables>;
export const BatchUpsertTemperatureReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BatchUpsertTemperatureReadings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"temperatureReadings"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TemperatureInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTemperatureReadings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"temperatureReadings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchUpsertTemperatureReadingsMutation, BatchUpsertTemperatureReadingsMutationVariables>;
export const BatchUpsertUvReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BatchUpsertUvReadings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uvReadings"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UvInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertUvReadings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uvReadings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"update_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"uv_index"}}]}}]}}]} as unknown as DocumentNode<BatchUpsertUvReadingsMutation, BatchUpsertUvReadingsMutationVariables>;
export const GetStationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}}]}}]}}]} as unknown as DocumentNode<GetStationsQuery, GetStationsQueryVariables>;