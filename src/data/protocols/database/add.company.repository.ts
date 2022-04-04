import { ICompanyModel } from "@/domain/models/company.model";
import { IAddCompanyModel } from "@/domain/usecases/add.company";

export interface IAddCompanyRepository {
  add(accountData: IAddCompanyModel): Promise<ICompanyModel>;
}
