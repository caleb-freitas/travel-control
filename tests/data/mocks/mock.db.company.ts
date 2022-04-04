import { ILoadCompanyByEmailRepository, IHashComparer } from "@/data/protocols";
import { LoadAccountByEmailRepository } from "@/data/protocols/database";
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
  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result> {
    return this.result;
  }
}
