import { IEncrypter, IHashComparer } from "@/data/protocols/cryptography";
import {
  ILoadCompanyByEmailRepository,
  IUpdateCompanyTokenRepository,
} from "@/data/protocols/database";
import { Authentication, IAuthentication } from "@/domain/usecases";

export class DbCompanyAuthentication implements IAuthentication {
  constructor(
    private readonly loadCompanyByEmail: ILoadCompanyByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateCompanyToken: IUpdateCompanyTokenRepository
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
      if (validPassword) {
        const accessToken = await this.encrypter.encrypt(company.id);
        await this.updateCompanyToken.updateAccessToken(
          company.id,
          accessToken
        );
        return {
          accessToken,
          name: company.name,
        };
      }
    }
    return null;
  }
}
