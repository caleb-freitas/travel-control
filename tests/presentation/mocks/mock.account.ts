import { ICompanyModel, IDriverModel } from "@/domain/models";
import {
  Authentication,
  IAddDriver,
  IAddDriverModel,
  IAddTruck,
  IAuthentication,
  ILoadAccountByToken,
  Truck,
} from "@/domain/usecases";
import { mockDriverResult, mockTruckModel } from "@/tests/domain/mocks";
import { mockCompanyResult } from "@/tests/domain/mocks/mock.company";

export class DbAuthenticationSpy implements IAuthentication {
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return {
      accessToken: "access_token",
      name: "name",
    };
  }
}

export class DbLoadAccountByTokenSpy implements ILoadAccountByToken {
  result = {
    role: "company",
    account: mockCompanyResult(),
  };
  async load(
    accessToken: string
  ): Promise<{ role: string; account: ICompanyModel | IDriverModel }> {
    return this.result;
  }
}

export class DbAddDriverSpy implements IAddDriver {
  driverAccount = mockDriverResult();
  async add(account: IAddDriverModel): Promise<IDriverModel | Error> {
    return this.driverAccount;
  }
}

export class DbAddTruckSpy implements IAddTruck {
  truck = mockTruckModel();
  async add(data: Truck.Params): Promise<Truck.Model> {
    return this.truck;
  }
}
