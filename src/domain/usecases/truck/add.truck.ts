import { Truck } from "@/domain/models";

export interface IAddTruck {
  add(data: Truck.Params): Promise<Truck.Model>;
}
