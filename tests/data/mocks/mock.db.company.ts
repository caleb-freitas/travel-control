import { Authentication, IAuthentication } from "@/domain/usecases";

export class DbCompanyAuthenticationSpy implements IAuthentication {
  result = {
    accessToken: "access_token",
    name: "name",
  };

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}
