import { ICompanyModel, IDriverModel } from "../models";

export interface ILoadAccountByToken {
  load(
    accessToken: string,
    role?: string
  ): Promise<ICompanyModel | IDriverModel>;
}
