import { ICompanyModel, IDriverModel } from "@/domain/models";

type T = {
  role: string;
  account: ICompanyModel | IDriverModel;
};

export interface ILoadAccountByTokenRepository {
  loadByToken(token: string): Promise<T>;
}
