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
import { mockCompanyAuthenticationResult } from "@/tests/domain/mocks";
import { mockCompanyResult } from "@/tests/domain/mocks/mock.company";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = mockCompanyAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}

export class LoadCompanyByEmailRepositorySpy
  // eslint-disable-next-line prettier/prettier
  implements ILoadCompanyByEmailRepository {
  result = mockCompanyResult();

  async loadByEmail(email: string): Promise<LoadCompanyByEmail.Result> {
    return this.result;
  }
}

export class UpdateCompanyTokenRepositorySpy
  // eslint-disable-next-line prettier/prettier
  implements IUpdateCompanyTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    return null;
  }
}

// eslint-disable-next-line prettier/prettier
export class LoadAccountByTokenRepositorySpy implements ILoadAccountByTokenRepository {
  result = mockCompanyResult();

  async loadByToken(token: string): Promise<ICompanyModel | IDriverModel> {
    return this.result;
  }
}
