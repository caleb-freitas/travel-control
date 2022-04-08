/* eslint-disable prettier/prettier */
import {
  IUpdateCompanyTokenRepository,
  LoadCompanyByEmail,
  ILoadCompanyByEmailRepository,
  ILoadAccountByTokenRepository,
  IAddCompanyRepository,
  ICheckCompanyByEmailRepository,
  ICheckCompanyByCnpjRepository,
} from "@/data/protocols/database";
import { ICompanyModel, IDriverModel } from "@/domain/models";
import { Authentication, IAddCompanyModel, IAuthentication } from "@/domain/usecases";
import {
  mockCompanyAuthenticationResult,
  mockCompanyResult,
} from "@/tests/domain/mocks";

export class AddAccountRepositorySpy implements IAddCompanyRepository {
  company: ICompanyModel
  async add(accountData: IAddCompanyModel): Promise<ICompanyModel> {
    this.company = mockCompanyResult();
    return new Promise((resolve) => resolve(this.company));
  }
}

export class LoadCompanyByEmailRepositorySpy implements ILoadCompanyByEmailRepository {
  company = mockCompanyResult();
  async loadByEmail(email: string): Promise<LoadCompanyByEmail.Result> {
    return this.company;
  }
}

export class LoadAccountByTokenRepositorySpy implements ILoadAccountByTokenRepository {
  result = mockCompanyResult();
  async loadByToken(
    token: string
  ): Promise<{ role: string; account: ICompanyModel | IDriverModel }> {
    return { role: "role", account: this.result };
  }
}

export class CheckCompanyByEmailRepositorySpy implements ICheckCompanyByEmailRepository {
  companyExists: boolean;
  async checkEmail(email: string): Promise<boolean> {
    this.companyExists = false
    return new Promise((resolve) => resolve(this.companyExists));
  }
}

export class CheckCompanyByCnpjRepositorySpy implements ICheckCompanyByCnpjRepository {
  companyExists: boolean;
  async checkCnpj(cnpj: string): Promise<boolean> {
    this.companyExists = false
    return new Promise((resolve) => resolve(this.companyExists));
  }
}

export class UpdateCompanyTokenRepositorySpy implements IUpdateCompanyTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    return null;
  }
}

export class DbCompanyAuthenticationSpy implements IAuthentication {
  companyAuth = mockCompanyAuthenticationResult();
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.companyAuth;
  }
}