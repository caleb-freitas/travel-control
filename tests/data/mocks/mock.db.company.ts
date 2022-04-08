/* eslint-disable prettier/prettier */
import {
  ILoadCompanyByEmailRepository,
  ILoadAccountByTokenRepository,
} from "@/data/protocols";
import {
  IUpdateCompanyTokenRepository,
  LoadCompanyByEmail,
} from "@/data/protocols/database";
import { ICompanyModel, IDriverModel } from "@/domain/models";
import { Authentication, IAuthentication } from "@/domain/usecases";
import { mockCompanyAuthenticationResult, mockCompanyResult } from "@/tests/domain/mocks";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = mockCompanyAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}

export class LoadCompanyByEmailRepositorySpy implements ILoadCompanyByEmailRepository {
  result = mockCompanyResult();

  async loadByEmail(email: string): Promise<LoadCompanyByEmail.Result> {
    return this.result;
  }
}

export class UpdateCompanyTokenRepositorySpy implements IUpdateCompanyTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    return null;
  }
}

export class LoadAccountByTokenRepositorySpy implements ILoadAccountByTokenRepository {
  result = mockCompanyResult();

  async loadByToken(
    token: string
  ): Promise<{ role: string; account: ICompanyModel | IDriverModel }> {
    return { role: "role", account: this.result }
  }
}
