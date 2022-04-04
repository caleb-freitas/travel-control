import { Authentication, IAuthentication } from "@/domain/usecases";

import { ILoadCompanyByEmailRepository } from "../protocols";

export class DbCompanyAuthentication implements IAuthentication {
  constructor(
    private readonly loadCompanyByEmail: ILoadCompanyByEmailRepository
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const company = await this.loadCompanyByEmail.loadByEmail(
      authenticationParams.email
    );
    return null;
  }
}
