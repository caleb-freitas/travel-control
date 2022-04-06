export const unauthorized = {
  description: "Unauthorized",
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
          error: "Unauthorized",
        },
        required: ["error"],
      },
    },
  },
};