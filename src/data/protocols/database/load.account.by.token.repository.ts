import { ICompanyModel, IDriverModel } from "@/domain/models";

export interface ILoadAccountByTokenRepository {
  loadByToken(token: string): Promise<ICompanyModel | IDriverModel>;
}
