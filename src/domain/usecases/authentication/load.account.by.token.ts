import { ICompanyModel, IDriverModel } from "@/domain/models";

type Authentication = {
  role: string;
  account: ICompanyModel | IDriverModel;
};

export interface ILoadAccountByToken {
  load(accessToken: string): Promise<Authentication>;
}
