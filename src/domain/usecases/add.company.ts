import { FieldInUseError } from "../../presentation/errors";
import { ICompanyModel } from "../models/company.model";

export interface IAddCompanyModel {
  name: string;
  email: string;
  password: string;
  cnpj: string;
}

export interface IAddCompany {
  add(account: IAddCompanyModel): Promise<ICompanyModel | FieldInUseError>;
}
