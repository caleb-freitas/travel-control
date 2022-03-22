export const companySchema = {
  type: 'object',
  properties: {
    id: {
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
    cnpj: {
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
    id: "a0757de1-bb7e-4c8e-838d-fb637cb1e169",
    name: "Company",
    email: "company@email.com",
    password: "HashedPass123",
    cnpj: "76.802.560/0001-21",
    created_at: "2022-03-22T13:35:56.204Z",
    updated_at: "NULL",
  }
}
