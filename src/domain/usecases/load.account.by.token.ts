import { ICompanyModel, IDriverModel } from "../models";

export interface ILoadAccountByToken {
  load(accessToken: string): Promise<ICompanyModel | IDriverModel>;
}
