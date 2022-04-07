import { ICompanyModel } from "@/domain/models";

export const mockCompanyResult = (): ICompanyModel => ({
  id: "company_id",
  cnpj: "company_cnpj",
  created_at: new Date(),
  email: "company@email.com",
  name: "company",
  password: "hashed_password",
  updated_at: new Date(),
  access_token: "any_token",
});
