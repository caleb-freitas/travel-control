import { Truck } from "@/domain/models";

export const mockTruckParams = (): Truck.Params => ({
  company_id: "company_id",
  license_plate: "ABC1B34",
  ton_capacity: 30,
  brand: "brand_name",
  model: "model_name",
});

export const mockTruckModel = (): Truck.Model => ({
  id: "truck_id",
  company_id: "company_id",
  license_plate: "ABC1B34",
  ton_capacity: 30,
  brand: "brand_name",
  model: "model_name",
  created_at: new Date("1995-12-17T03:24:00"),
});
