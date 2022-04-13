export const travelParamsSchema = {
  type: "object",
  properties: {
    client: {
      type: "string",
    },
    departure_city: {
      type: "string",
    },
    departure_state: {
      type: "string",
    },
    destination_city: {
      type: "string",
    },
    destination_state: {
      type: "string",
    },
    product: {
      type: "string",
    },
    freight_value: {
      type: "number",
    },
    delivered_in: {
      type: "timestamp(3)",
    },
  },
  example: {
    client: "client",
    departure_city: "departure_city",
    departure_state: "departure_state",
    destination_city: "destination_city",
    destination_state: "destination_state",
    product: "product",
    freight_value: 1000,
  },
  required: [
    "client",
    "departure_city",
    "departure_state",
    "destination_city",
    "destination_state",
    "product"
  ]
}

