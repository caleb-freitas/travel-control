import { ILoadCompanyByEmailRepository } from "@/data/protocols";
import { Authentication, IAuthentication } from "@/domain/usecases";
import { mockCompanyAuthenticationResult } from "@/tests/domain/mocks";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = mockCompanyAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}

export class LoadCompanyByEmailRepositorySpy
  // eslint-disable-next-line prettier/prettier
  implements ILoadCompanyByEmailRepository {
  result = true;

  async loadByEmail(email: string): Promise<boolean> {
    return this.result;
  }
}
