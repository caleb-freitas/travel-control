import { ICompanyModel } from "@/domain/models";

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
