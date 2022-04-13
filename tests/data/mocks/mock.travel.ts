/* eslint-disable prettier/prettier */

import { IAddTravelRepository, ICheckDriverByIdRepository, ICheckTruckByIdRepository } from "@/data/protocols"
import { Travel } from "@/domain/usecases";
import { mockTravelModel } from "@/tests/domain/mocks";

export class AddTravelRepositorySpy implements IAddTravelRepository {
  travel = mockTravelModel()
  async add(traveData: Travel.Params): Promise<Travel.Model> {
    return this.travel
  }
}

export class CheckDriverByIdRepositorySpy implements ICheckDriverByIdRepository {
  driverExists = true;
  async check(id: string): Promise<boolean> {
    return this.driverExists;
  }
}

export class CheckTruckByIdRepositorySpy implements ICheckTruckByIdRepository {
  truckExists = true;
  async check(id: string): Promise<boolean> {
    return this.truckExists;
  }
}
