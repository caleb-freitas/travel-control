import { ICompanyModel, IDriverModel } from "@/domain/models";

type t = {
  role: string;
  account: ICompanyModel | IDriverModel;
};

export interface ILoadAccountByTokenRepository {
  loadByToken(token: string): Promise<t>;
}
