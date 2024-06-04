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
  fetch_date?: Maybe<Scalars['Date']['output']>;
  fetch_job_start_date?: Maybe<Scalars['Date']['output']>;
  fetch_jobs_type_id?: Maybe<Scalars['ID']['output']>;
  fetch_url?: Maybe<Scalars['String']['output']>;
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  workflow_id?: Maybe<Scalars['String']['output']>;
};

export type FetchJobsInput = {
  fetch_date: Scalars['Date']['input'];
  fetch_job_start_date: Scalars['Date']['input'];
  fetch_url: Scalars['String']['input'];
  file_name?: InputMaybe<Scalars['String']['input']>;
  topic_id: Scalars['String']['input'];
  workflow_id: Scalars['String']['input'];
};

export type Humidity = {
  __typename?: 'Humidity';
  file_name?: Maybe<Scalars['String']['output']>;
  humidity_value?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type HumidityInput = {
  file_name?: InputMaybe<Scalars['String']['input']>;
  humidity_value?: InputMaybe<Scalars['String']['input']>;
  station_id: Scalars['String']['input'];
  timestamp: Scalars['Date']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes all station record. */
  deleteAllStations?: Maybe<Array<Stations>>;
  /** Deletes all temperature readings. */
  deleteAllTemperatureReadings?: Maybe<Array<Temperature>>;
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

export type Query = {
  __typename?: 'Query';
  /** Fetches the job tasks by the topic id */
  findFetchJobsByTopicId?: Maybe<FetchJobs>;
  /** Fetches the job tasks by id. */
  findFetchJobsTaskById?: Maybe<FetchJobs>;
  /** Finds the humidity reading by the station_id. */
  findHumidityReadingsByStationId?: Maybe<Array<Humidity>>;
  /** Finds the latest rainfall reading by station_id. */
  findLatestRainfallByStationId?: Maybe<Rainfall>;
  /** Finds the latest temperature reading by the station_id. */
  findLatestTemperatureReadingByStationid?: Maybe<Temperature>;
  /** Finds the rainfall readings by station_id. */
  findRainfallByStationId?: Maybe<Array<Rainfall>>;
  /** Finds a station by station_id. */
  findStationsByStationId?: Maybe<Stations>;
  /** Finds the temperature reading by the station_id. */
  findTemperatureReadingByStationid?: Maybe<Array<Temperature>>;
  /** Finds all stations. */
  getAllStations?: Maybe<Array<Stations>>;
};


export type QueryFindFetchJobsByTopicIdArgs = {
  topic_id: Scalars['String']['input'];
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
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type RainfallInput = {
  file_name?: InputMaybe<Scalars['String']['input']>;
  rainfall_value?: InputMaybe<Scalars['String']['input']>;
  station_id: Scalars['String']['input'];
  timestamp: Scalars['Date']['input'];
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
  latitude?: InputMaybe<Scalars['Float']['input']>;
  location_name?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  station_id: Scalars['String']['input'];
};

export type Temperature = {
  __typename?: 'Temperature';
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reading?: Maybe<Scalars['String']['output']>;
  station_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type TemperatureInput = {
  file_name?: InputMaybe<Scalars['String']['input']>;
  reading?: InputMaybe<Scalars['String']['input']>;
  station_id: Scalars['String']['input'];
  timestamp: Scalars['Date']['input'];
};

export type GetStationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStationsQuery = { __typename?: 'Query', getAllStations?: Array<{ __typename?: 'Stations', station_id?: string | null }> | null };


export const GetStationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"station_id"}}]}}]}}]} as unknown as DocumentNode<GetStationsQuery, GetStationsQueryVariables>;