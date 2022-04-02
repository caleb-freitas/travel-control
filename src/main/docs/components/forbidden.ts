export const forbidden = {
  description: "Forbidden",
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