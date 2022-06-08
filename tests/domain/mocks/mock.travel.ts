import { Travel } from "@/domain/models";

export const mockTravelParams = (): Travel.Params => ({
  driver_id: "driver_id",
  company_id: "company_id",
  truck_id: "truck_id",
  client: "client",
  departure_city: "departure_city",
  departure_state: "departure_state",
  destination_city: "destination_city",
  destination_state: "destination_state",
  product: "product",
  freight_value: 1000,
});

export const mockTravelModel = (): Travel.Model => ({
  id: "travel_id",
  driver_id: "driver_id",
  company_id: "company_id",
  truck_id: "truck_id",
  client: "client",
  departure_city: "departure_city",
  departure_state: "departure_state",
  destination_city: "destination_city",
  destination_state: "destination_state",
  product: "product",
  freight_value: 1000,
  created_at: new Date("1995-12-17T03:24:00"),
  delivered_in: new Date("1995-12-17T03:24:00"),
});
