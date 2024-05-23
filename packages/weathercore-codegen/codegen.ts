import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "../weathercore-schema/schema.graphql",
  // documents: "../../apps/**/!(*.d).{ts,tsx}",
  generates: {
    '../weathercore-representations/src/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-resolvers'],

    },
  },
  config: {
    scalars: {
      DateTime: 'Date'
    }
  }
};

export default config;
