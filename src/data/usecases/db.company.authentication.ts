import {
  Authentication,
  IAuthentication,
} from "@/domain/usecases/authentication";

export class DbCompanyAuthentication implements IAuthentication {
  auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    throw new Error("Method not implemented.");
  }
}
