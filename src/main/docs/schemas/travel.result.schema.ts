export const travelResultSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    company_id: {
      type: "string",
    },
    driver_id: {
      type: "string",
    },
    truck_id: {
      type: "string",
    },
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
    created_at: {
      type: "timestamp(3)",
    },
    delivered_in: {
      type: "timestamp(3)",
    },
  },
  example: {
    id: "304f64ca-ed08-4c80-ae49-03dc6a9bf431",
    driver_id: "b38e70a6-edee-4107-997e-46f526e58ba7",
    company_id: "02054d91-5a5d-48b9-a9b1-8352dd8fa874",
    truck_id: "01d4ebd8-e467-4815-a289-1949a0d7c577",
    client: "client",
    departure_city: "departure_city",
    departure_state: "departure_state",
    destination_city: "destination_city",
    destination_state: "destination_state",
    product: "product",
    freight_value: 1000,
    created_at: new Date("1995-12-17T03:24:00"),
    delivered_in: new Date("1995-12-17T03:24:00"),
  },
}
