export const driverAccountSchema = {
  type: "object",
  properties: {
    company_id: {
      type: 'string'
    },
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
    company_id: "create a company on /company/signup and add its id here",
    name: "Driver",
    email: "driver@email.com",
    password: "ValidPass123",
    passwordConfirmation: "ValidPass123",
    drivers_license: "000.000-01"
  },
  required: ["company_id", "name", "email", "password", "passwordConfirmation", "drivers_license"]
}