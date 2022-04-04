import { ICompanyModel } from "@/domain/models";
import {
  randEmail,
  randPassword,
  randUserName,
  randWord,
  randUuid,
} from "@ngneat/falso";

export const mockCompanyResult = (): ICompanyModel => ({
  id: randUuid(),
  cnpj: randWord(),
  created_at: new Date(),
  email: randEmail(),
  name: randUserName(),
  password: randPassword(),
  updated_at: new Date(),
});
