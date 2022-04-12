import {
  IAddTruckRepository,
  ICheckTruckLicensePlateRepository,
} from "@/data/protocols/database";
import { IAddTruck, Truck } from "@/domain/usecases";

export class DbAddTruck implements IAddTruck {
  constructor(
    private readonly checkTruckLicensePlate: ICheckTruckLicensePlateRepository,
    private readonly addTruck: IAddTruckRepository
  ) {}

  async add(data: Truck.Params): Promise<Truck.Model> {
    const truckExists = await this.checkTruckLicensePlate.check(
      data.license_plate
    );
    if (truckExists) return null;
    const truck = await this.addTruck.add({
      ...data,
    });
    return truck;
  }
}
