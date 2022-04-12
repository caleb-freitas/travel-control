export const truckResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    company_id: {
      type: 'string'
    },
    license_plate: {
      type: "string",
    },
    ton_capacity: {
      type: "number",
    },
    brand: {
      type: "string",
    },
    model: {
      type: "string",
    },
    created_at: {
      type: "timestamp"
    },
  },
  example: {
    id: "654f2ccc-3ae9-4aec-9a98-c4aa8d8c08b7",
    company_id: "3ac83e6d-36c4-4235-b269-ba6db80505d9",
    license_plate: "ABC1B34",
    ton_capacity: 30,
    brand: "brand_name",
    model: "model_name",
    created_at: "2022-03-22T13:35:56.204Z",
  }
}