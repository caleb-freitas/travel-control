export const companyParamsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    passwordConfirmation: {
      type: "string",
    },
    cnpj: {
      type: "string",
    },
  },
  example: {
    name: "Company",
    email: "company@email.com",
    password: "ValidPass123",
    passwordConfirmation: "ValidPass123",
    cnpj: "76.802.560/0001-21"
  },
  required: ["name", "email", "password", "passwordConfirmation", "cnpj"]
}