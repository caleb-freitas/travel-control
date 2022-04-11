import { IDecrypter, ILoadAccountByTokenRepository } from "@/data/protocols";
import { ICompanyModel, IDriverModel } from "@/domain/models";
import { ILoadAccountByToken } from "@/domain/usecases/";

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}
  async load(
    accessToken: string
  ): Promise<{ role: string; account: ICompanyModel | IDriverModel }> {
    const token = await this.decrypter.decrypt(accessToken);
    if (!token) return null;
    const response = await this.loadAccountByTokenRepository.loadByToken(
      accessToken
    );
    if (!response) return null;
    return { role: response.role, account: response.account };
  }
}
