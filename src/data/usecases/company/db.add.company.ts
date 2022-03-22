import { FieldInUseError } from "../../../presentation/errors";
import { ICheckCompanyByCnpjRepository } from "../../protocols/database/company/check.company.by.cnpj.repository";
import { ICheckCompanyByEmailRepository } from "../../protocols/database/company/check.company.by.email.repository";
import {
  ICompanyModel,
  IAddCompany,
  IAddCompanyModel,
  IHasher,
  IAddCompanyRepository,
} from "./db.add.company.protocols";

export class DbAddCompany implements IAddCompany {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddCompanyRepository,
    private readonly checkCompanyByEmailRepository: ICheckCompanyByEmailRepository,
    private readonly checkAccountByCnpjRepository: ICheckCompanyByCnpjRepository
  ) {}
  async add(
    accountData: IAddCompanyModel
  ): Promise<ICompanyModel | FieldInUseError> {
    const emailExists = await this.checkCompanyByEmailRepository.checkEmail(
      accountData.email
    );
    const cnpjExists = await this.checkAccountByCnpjRepository.checkCnpj(
      accountData.cnpj
    );
    if (emailExists) {
      return new FieldInUseError("email");
    }
    if (cnpjExists) {
      return new FieldInUseError("cnpj");
    }
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
