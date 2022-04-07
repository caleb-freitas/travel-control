import { ICompanyModel, IDriverModel } from "@/domain/models";
import {
  Authentication,
  IAuthentication,
  ILoadAccountByToken,
} from "@/domain/usecases";
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
  result = mockCompanyResult();
  async load(accessToken: string): Promise<ICompanyModel | IDriverModel> {
    return this.result;
  }
}
