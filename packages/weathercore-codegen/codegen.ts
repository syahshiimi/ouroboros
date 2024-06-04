import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "../weathercore-schema/schema.graphql",
  documents: ["../../apps/**/*.graphql"],
  emitLegacyCommonJSImports: false,
  generates: {
    '../weathercore-representations/src/': {
      preset: 'client',
      plugins: [],
      config: {
        useTypeImports: true,
        enumsAsConst: true,
      },
    },
  },
  config: {
    scalars: {
      DateTime: 'Date'
    },
    fetcher: "graphql-request"
  }
};

export default config;
