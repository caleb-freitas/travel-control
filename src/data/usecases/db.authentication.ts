import {
  Authentication,
  IAuthentication,
} from "@/domain/usecases/authentication";

export class DbAuthentication implements IAuthentication {
  constructor(private readonly dbCompanyAuthentication: IAuthentication) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    await this.dbCompanyAuthentication.auth(authenticationParams);
    return null;
  }
}
