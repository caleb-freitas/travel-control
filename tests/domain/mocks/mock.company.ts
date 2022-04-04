import { ICompanyModel } from "@/domain/models";
import { randEmail, randUserName, randWord } from "@ngneat/falso";

export const mockCompanyResult = (): ICompanyModel => ({
  id: "company_id",
  cnpj: randWord(),
  created_at: new Date(),
  email: randEmail(),
  name: "company",
  password: "hashed_password",
  updated_at: new Date(),
});
