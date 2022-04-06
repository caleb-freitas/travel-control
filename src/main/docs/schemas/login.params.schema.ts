export const loginParamsSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
    },
  },
  example: {
    email: "valid@email.com",
    password: "ValidPass123",
    role: "company or driver"
  },
  required: ["email", "password", "role"]
}
