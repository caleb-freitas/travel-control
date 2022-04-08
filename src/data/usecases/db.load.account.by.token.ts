import { IDecrypter, ILoadAccountByTokenRepository } from "@/data/protocols";
import { ICompanyModel, IDriverModel } from "@/domain/models";
import { ILoadAccountByToken } from "@/domain/usecases/";

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load(
    accessToken: string,
    roleAdmin?: string
  ): Promise<ICompanyModel | IDriverModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      const { role, account } =
        await this.loadAccountByTokenRepository.loadByToken(accessToken);
      if (role === roleAdmin) {
        return account;
      }
      if (account) {
        return account;
      }
      return null;
    }
  }
}
