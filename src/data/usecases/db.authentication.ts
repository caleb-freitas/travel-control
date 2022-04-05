import {
  Authentication,
  IAuthentication,
} from "@/domain/usecases/authentication";

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly dbCompanyAuthentication: IAuthentication,
    private readonly dbDriverAuthentication: IAuthentication
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const { email, password, role } = authenticationParams;
    if (role === "company") {
      const companyAccessToken = await this.dbCompanyAuthentication.auth(
        authenticationParams
      );
      return companyAccessToken;
    }
    if (role === "driver") {
      const driverAccessToken = await this.dbDriverAuthentication.auth(
        authenticationParams
      );
      return driverAccessToken;
    }
    return null;
  }
}
