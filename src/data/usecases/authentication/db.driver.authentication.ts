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
    const { email, password } = authenticationParams;
    const driver = await this.loadDriverByEmail.loadByEmail(email);
    if (!driver) return null;
    const validPassword = await this.hashComparer.compare(
      password,
      driver.password
    );
    if (!validPassword) return null;
    const accessToken = await this.encrypter.encrypt(driver.id);
    await this.updateDriverToken.updateAccessToken(driver.id, accessToken);
    return {
      accessToken,
      name: driver.name,
    };
  }
}
