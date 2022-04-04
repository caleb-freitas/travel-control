import { IHashComparer } from "@/data/protocols/cryptography";
import { ILoadCompanyByEmailRepository } from "@/data/protocols/database";
import { Authentication, IAuthentication } from "@/domain/usecases";

export class DbCompanyAuthentication implements IAuthentication {
  constructor(
    private readonly loadCompanyByEmail: ILoadCompanyByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const company = await this.loadCompanyByEmail.loadByEmail(
      authenticationParams.email
    );
    if (company) {
      const validPassword = await this.hashComparer.compare(
        authenticationParams.password,
        company.password
      );
    }
    return null;
  }
}
