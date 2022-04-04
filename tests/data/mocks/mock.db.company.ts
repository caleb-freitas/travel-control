import { Authentication, IAuthentication } from "@/domain/usecases";
import { mockAuthenticationResult } from "@/tests/domain/mocks";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = mockAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}
