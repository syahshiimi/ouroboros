import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "../weathercore-schema/schema.graphql",
  // documents: "../../apps/**/!(*.d).{ts,tsx}",
  generates: {
    '../weathercore-gql/src/': {
      preset: 'client',
      plugins: []
    },
  },
  config: {
    scalars: {
      DateTime: 'Date'
    }
  }
};

export default config;
