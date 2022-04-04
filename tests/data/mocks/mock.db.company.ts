import { Authentication, IAuthentication } from "@/domain/usecases";
import { mockCompanyAuthenticationResult } from "@/tests/domain/mocks";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = mockCompanyAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}
