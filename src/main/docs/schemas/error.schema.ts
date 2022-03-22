export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  example: {
    error: "Error message",
  },
  required: ['error']
}
