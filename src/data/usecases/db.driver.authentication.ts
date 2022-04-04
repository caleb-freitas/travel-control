import { IEncrypter, IHashComparer } from "@/data/protocols/cryptography";
import {
  ILoadDriverByEmailRepository,
  IUpdateDriverTokenRepository,
} from "@/data/protocols/database";
import { Authentication, IAuthentication } from "@/domain/usecases";

export class DbDriverAuthentication implements IAuthentication {
  constructor(
    private readonly loadDriverByEmail: ILoadDriverByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateDriverToken: IUpdateDriverTokenRepository
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const driver = await this.loadDriverByEmail.loadByEmail(
      authenticationParams.email
    );
    if (driver) {
      const validPassword = await this.hashComparer.compare(
        authenticationParams.password,
        driver.password
      );
      if (validPassword) {
        const accessToken = await this.encrypter.encrypt(driver.id);
        await this.updateDriverToken.updateAccessToken(driver.id, accessToken);
        return {
          accessToken,
          name: driver.name,
        };
      }
    }
    return null;
  }
}
