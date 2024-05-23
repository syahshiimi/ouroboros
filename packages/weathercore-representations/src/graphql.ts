/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FetchJobs: ResolverTypeWrapper<FetchJobs>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  FetchJobsInput: FetchJobsInput;
  Humidity: ResolverTypeWrapper<Humidity>;
  HumidityInput: HumidityInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Rainfall: ResolverTypeWrapper<Rainfall>;
  RainfallInput: RainfallInput;
  Stations: ResolverTypeWrapper<Stations>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  StationsInput: StationsInput;
  Temperature: ResolverTypeWrapper<Temperature>;
  TemperatureInput: TemperatureInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date']['output'];
  FetchJobs: FetchJobs;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  FetchJobsInput: FetchJobsInput;
  Humidity: Humidity;
  HumidityInput: HumidityInput;
  Mutation: {};
  Query: {};
  Rainfall: Rainfall;
  RainfallInput: RainfallInput;
  Stations: Stations;
  Float: Scalars['Float']['output'];
  StationsInput: StationsInput;
  Temperature: Temperature;
  TemperatureInput: TemperatureInput;
  Boolean: Scalars['Boolean']['output'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FetchJobsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchJobs'] = ResolversParentTypes['FetchJobs']> = {
  fetch_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fetch_job_start_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fetch_jobs_type_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  fetch_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  workflow_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HumidityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Humidity'] = ResolversParentTypes['Humidity']> = {
  file_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  humidity_value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteAllStations?: Resolver<Maybe<Array<ResolversTypes['Stations']>>, ParentType, ContextType>;
  deleteAllTemperatureReadings?: Resolver<Maybe<Array<ResolversTypes['Temperature']>>, ParentType, ContextType>;
  deleteHumidityReadings?: Resolver<Maybe<Array<ResolversTypes['Humidity']>>, ParentType, ContextType>;
  deleteRainfallReadingStationId?: Resolver<Array<ResolversTypes['Rainfall']>, ParentType, ContextType, RequireFields<MutationDeleteRainfallReadingStationIdArgs, 'station_id'>>;
  deleteRainfallReadings?: Resolver<Maybe<Array<ResolversTypes['Rainfall']>>, ParentType, ContextType>;
  deleteTemperatureReadingById?: Resolver<Maybe<ResolversTypes['Temperature']>, ParentType, ContextType, RequireFields<MutationDeleteTemperatureReadingByIdArgs, 'id'>>;
  upsertFetchJobsTask?: Resolver<Maybe<Array<ResolversTypes['FetchJobs']>>, ParentType, ContextType, RequireFields<MutationUpsertFetchJobsTaskArgs, 'input'>>;
  upsertHumidityReadings?: Resolver<Array<ResolversTypes['Humidity']>, ParentType, ContextType, RequireFields<MutationUpsertHumidityReadingsArgs, 'input'>>;
  upsertRainfallReadings?: Resolver<Array<ResolversTypes['Rainfall']>, ParentType, ContextType, RequireFields<MutationUpsertRainfallReadingsArgs, 'input'>>;
  upsertStation?: Resolver<Maybe<Array<ResolversTypes['Stations']>>, ParentType, ContextType, RequireFields<MutationUpsertStationArgs, 'input'>>;
  upsertTemperatureReadings?: Resolver<Maybe<Array<ResolversTypes['Temperature']>>, ParentType, ContextType, RequireFields<MutationUpsertTemperatureReadingsArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findFetchJobsByTopicId?: Resolver<Maybe<ResolversTypes['FetchJobs']>, ParentType, ContextType, RequireFields<QueryFindFetchJobsByTopicIdArgs, 'topic_id'>>;
  findFetchJobsTaskById?: Resolver<Maybe<ResolversTypes['FetchJobs']>, ParentType, ContextType, RequireFields<QueryFindFetchJobsTaskByIdArgs, 'id'>>;
  findHumidityReadingsByStationId?: Resolver<Maybe<Array<ResolversTypes['Humidity']>>, ParentType, ContextType, RequireFields<QueryFindHumidityReadingsByStationIdArgs, 'station_id'>>;
  findLatestRainfallByStationId?: Resolver<Maybe<ResolversTypes['Rainfall']>, ParentType, ContextType, RequireFields<QueryFindLatestRainfallByStationIdArgs, 'station_id'>>;
  findLatestTemperatureReadingByStationid?: Resolver<Maybe<ResolversTypes['Temperature']>, ParentType, ContextType, RequireFields<QueryFindLatestTemperatureReadingByStationidArgs, 'station_id'>>;
  findRainfallByStationId?: Resolver<Maybe<Array<ResolversTypes['Rainfall']>>, ParentType, ContextType, RequireFields<QueryFindRainfallByStationIdArgs, 'station_id'>>;
  findStationsByStationId?: Resolver<Maybe<ResolversTypes['Stations']>, ParentType, ContextType, RequireFields<QueryFindStationsByStationIdArgs, 'station_id'>>;
  findTemperatureReadingByStationid?: Resolver<Maybe<Array<ResolversTypes['Temperature']>>, ParentType, ContextType, RequireFields<QueryFindTemperatureReadingByStationidArgs, 'station_id'>>;
  getAllStations?: Resolver<Maybe<Array<ResolversTypes['Stations']>>, ParentType, ContextType>;
};

export type RainfallResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rainfall'] = ResolversParentTypes['Rainfall']> = {
  file_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rainfall_value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stations'] = ResolversParentTypes['Stations']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  station_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemperatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Temperature'] = ResolversParentTypes['Temperature']> = {
  file_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  FetchJobs?: FetchJobsResolvers<ContextType>;
  Humidity?: HumidityResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rainfall?: RainfallResolvers<ContextType>;
  Stations?: StationsResolvers<ContextType>;
  Temperature?: TemperatureResolvers<ContextType>;
};

