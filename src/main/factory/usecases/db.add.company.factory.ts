import { DbAddCompany } from "../../../data/usecases/db.add.company";
import { IAddCompany } from "../../../domain/usecases/add.company";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt.adapter/bcrypt.adapter";
import { CheckCompanyByCnpjRepository } from "../../../infra/database/prisma/company/check.account.by.cnpj.repository";
import { CheckCompanyByEmailRepository } from "../../../infra/database/prisma/company/check.company.by.email.repository";
import { CompanyRepository } from "../../../infra/database/prisma/company/company.repository";

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
