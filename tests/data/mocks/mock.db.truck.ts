import {
  IAddTruckRepository,
  ICheckTruckLicensePlateRepository,
} from "@/data/protocols";
import { Truck } from "@/domain/models";
import { mockTruckModel } from "@/tests/domain/mocks";

// eslint-disable-next-line prettier/prettier
export class CheckTruckLicensePlateRepositorySpy implements ICheckTruckLicensePlateRepository {
  result = false;
  async check(licensePlate: string): Promise<boolean> {
    return this.result;
  }
}
export class AddTruckRepositorySpy implements IAddTruckRepository {
  model = mockTruckModel();
  async add(data: Truck.Params): Promise<Truck.Model> {
    return this.model;
  }
}
