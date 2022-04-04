import { Authentication, IAuthentication } from "@/domain/usecases";
import { mockDriverAuthenticationResult } from "@/tests/domain/mocks";

export class DbDriverAuthenticationSpy implements IAuthentication {
  result = mockDriverAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}
