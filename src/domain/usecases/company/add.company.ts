import { ICompanyModel } from "@/domain/models";
import { FieldInUseError } from "@/presentation/errors";

export interface IAddCompanyModel {
  name: string;
  email: string;
  password: string;
  cnpj: string;
}

export interface IAddCompany {
  add(account: IAddCompanyModel): Promise<ICompanyModel | FieldInUseError>;
}
