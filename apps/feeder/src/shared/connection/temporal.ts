/**
 * Returns the correct connection endpoint based on the node environment.
**/
export const temporalConnectionUrl = () => process.env.NODE_ENV === 'production'
  ? process.env.TEMPORAL_SERVER_ENDPOINT
  : 'localhost:7233'
