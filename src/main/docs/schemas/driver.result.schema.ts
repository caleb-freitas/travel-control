export const driverResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
    drivers_license: {
      type: "string"
    },
    created_at: {
      type: "timestamp"
    },
    updated_at: {
      type: "timestamp"
    }
  },
  example: {
    id: "1f0cd01c-bb2d-44f8-a56e-608999a1f2d0",
    company_id: "3ac83e6d-36c4-4235-b269-ba6db80505d9",
    name: "Driver",
    email: "driver@email.com",
    password: "HashedPass123",
    drivers_license: "000.000-01",
    created_at: "2022-03-22T13:35:56.204Z",
    updated_at: "NULL",
  }
}