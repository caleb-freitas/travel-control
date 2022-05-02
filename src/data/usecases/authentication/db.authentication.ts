import {
  Authentication,
  IAuthentication,
} from "@/domain/usecases/authentication";

/* Class representing authentication process for both company and driver */
export class DbAuthentication implements IAuthentication {
  /**
   * Initialize variable responsible for authenticating a company or a driver
   *
   * @param dbCompanyAuthentication - specific use case for authenticate a company
   * @param dbDriverAuthentication - specific use case for authenticate a driver
   */
  constructor(
    private readonly dbCompanyAuthentication: IAuthentication,
    private readonly dbDriverAuthentication: IAuthentication
  ) {}

  /**
   * Responsible for authenticate either a company or a driver
   *
   * @param authData - email, password and role from a company or a driver
   * @returns an object containing an access token and the name of the account on success. null if provided data is invalid
   */
  async auth(authData: Authentication.Params): Promise<Authentication.Result> {
    const { role } = authData;
    if (role === "company") {
      const companyAccessToken = await this.dbCompanyAuthentication.auth(
        authData
      );
      return companyAccessToken;
    }
    if (role === "driver") {
      const driverAccessToken = await this.dbDriverAuthentication.auth(
        authData
      );
      return driverAccessToken;
    }
    return null;
  }
}
