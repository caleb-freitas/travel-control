import { Truck } from "@/domain/usecases";

export interface IAddTruckRepository {
  add(data: Truck.Params): Promise<Truck.Model>;
}
