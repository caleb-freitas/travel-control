import { ICompanyModel } from "@/domain/models/company";
import { IAddCompanyModel } from "@/domain/usecases";

export interface IAddCompanyRepository {
  add(accountData: IAddCompanyModel): Promise<ICompanyModel>;
}
