import { Authentication, IAuthentication } from "@/domain/usecases";

export class DbAuthenticationSpy implements IAuthentication {
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return {
      accessToken: "access_token",
      name: "name",
    };
  }
}
