/* eslint-disable prettier/prettier */
import {
  IAddDriverRepository,
  ICheckCompanyByIdRepository,
  ICheckDriverByEmailRepository,
  ILoadDriverByEmailRepository,
  IUpdateDriverTokenRepository,
  LoadDriverByEmail,
} from "@/data/protocols/database";
import { IDriverModel } from "@/domain/models";
import {
  Authentication,
  IAddDriverModel,
  IAuthentication,
} from "@/domain/usecases";
import {
  mockDriverAuthenticationResult,
  mockDriverResult,
} from "@/tests/domain/mocks";

export class AddDriverRepositorySpy implements IAddDriverRepository {
  driver: IDriverModel;
  add(accountData: IAddDriverModel): Promise<IDriverModel> {
    this.driver = mockDriverResult()
    return new Promise((resolve) => resolve(this.driver));
  }
}

export class LoadDriverByEmailRepositorySpy implements ILoadDriverByEmailRepository {
  driver = mockDriverResult()
  async loadByEmail(email: string): Promise<LoadDriverByEmail.Result> {
    return this.driver;
  }
}

export class UpdateDriverTokenRepositorySpy implements IUpdateDriverTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    return null;
  }
}

export class CheckDriverEmailRepositorySpy implements ICheckDriverByEmailRepository {
  driverExists: boolean;
  async checkEmail(email: string): Promise<boolean> {
    this.driverExists = false
    return new Promise((resolve) => resolve(this.driverExists));
  }
}

export class CheckCompanyByIdRepositorySpy implements ICheckCompanyByIdRepository {
  driverExists: boolean;
  async checkId(id: string): Promise<boolean> {
    this.driverExists = true
    return new Promise((resolve) => resolve(this.driverExists));
  }
}

export class DbDriverAuthenticationSpy implements IAuthentication {
  result = mockDriverAuthenticationResult();
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}
