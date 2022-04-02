export const badRequest = {
  description: "Bad request",
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
          error: "Missing param error: {param}",
        },
        required: ["error"],
      },
    },
  },
};