module.exports = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "./src/documents/*.graphql",
  generates: {
    "./src/generated/types.ts": {
      plugins: ["typescript", "typescript-operations", "time"],
    },
    "./src/generated/sdk.ts": {
      config: {
        pureMagicComment: true,
        gqlImport: "../utils/gqlLodash#gql",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
        "time",
      ],
    },
  },
};
