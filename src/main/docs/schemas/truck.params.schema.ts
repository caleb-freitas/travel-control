export const truckParamsSchema = {
  type: "object",
  properties: {
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
  },
  example: {
    license_plate: "ABC1B34",
    ton_capacity: 30,
    brand: "brand_name",
    model: "model_name",
  },
  required: ["license_plate", "ton_capacity", "brand", "model"]
}
