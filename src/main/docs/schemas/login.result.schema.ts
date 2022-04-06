export const loginResultSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
  },
  example: {
    accessToken: "json web token",
    name: "Company",
  }
}
