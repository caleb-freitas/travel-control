export const driverParamsSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    drivers_license: {
      type: "string"
    },
  },
  example: {
    name: "Driver",
    email: "driver@email.com",
    password: "ValidPass123",
    passwordConfirmation: "ValidPass123",
    drivers_license: "000.000-01"
  },
  required: ["name", "email", "password", "passwordConfirmation", "drivers_license"]
}