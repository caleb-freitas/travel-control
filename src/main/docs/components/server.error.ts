export const serverError = {
  description: "Internal server error",
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
          error: "Internal server error",
        },
        required: ["error"],
      },
    },
  },
};