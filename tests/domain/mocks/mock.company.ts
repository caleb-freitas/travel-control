import { ICompanyModel } from "@/domain/models";
import { IAddCompanyModel } from "@/domain/usecases";

export const mockCompanyResult = (): ICompanyModel => ({
  id: "company_id",
  cnpj: "company_cnpj",
  created_at: new Date("1995-12-17T03:24:00"),
  email: "company@email.com",
  name: "company",
  password: "hashed_password",
  updated_at: new Date("1995-12-17T03:24:00"),
  access_token: "any_token",
});

export const mockCompanyParams = (): IAddCompanyModel => ({
  name: "company",
  email: "company@email.com",
  password: "valid_password",
  cnpj: "company_cnpj",
});
export const mockHashedCompanyParams = (): IAddCompanyModel => ({
  name: "company",
  email: "company@email.com",
  password: "hashed_password",
  cnpj: "company_cnpj",
});
