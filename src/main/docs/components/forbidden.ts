export const forbidden = {
  description: 'Not authorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  },
}