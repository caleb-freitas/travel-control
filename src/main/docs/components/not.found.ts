export const notFound = {
  description: "Not found",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          error: {
            type: "string",
          },
        },
        example: {
          error: "Invalid param error: {param}",
        },
        required: ["error"],
      },
    },
  },
};