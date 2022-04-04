import { DbAddCompany } from "@/data/usecases";
import { IAddCompany } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import {
  CheckCompanyByCnpjRepository,
  CheckCompanyByEmailRepository,
  CompanyRepository,
} from "@/infra/repositories";

export const makeDbAddCompany = (): IAddCompany => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const companyPrismaRepository = new CompanyRepository();
  const checkCompanyByEmailRepository = new CheckCompanyByEmailRepository();
  const checkAccountByCnpjRepository = new CheckCompanyByCnpjRepository();
  return new DbAddCompany(
    bcryptAdapter,
    companyPrismaRepository,
    checkCompanyByEmailRepository,
    checkAccountByCnpjRepository
  );
};
