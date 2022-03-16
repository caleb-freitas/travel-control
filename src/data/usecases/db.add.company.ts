import { ICheckCompanyByCnpjRepository } from "../protocols/database/check.company.by.cnpj.repository";
import { ICheckCompanyByEmailRepository } from "../protocols/database/check.company.by.email.repository";
import {
  ICompanyModel,
  IAddCompany,
  IAddCompanyModel,
  IAddCompanyRepository,
  IHasher,
} from "./db.add.company.protocols";

export class DbAddCompany implements IAddCompany {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddCompanyRepository,
    private readonly CheckCompanyByEmailRepository: ICheckCompanyByEmailRepository,
    private readonly checkAccountByCnpjRepository: ICheckCompanyByCnpjRepository
  ) {}
  async add(accountData: IAddCompanyModel): Promise<ICompanyModel | boolean> {
    const emailExists = await this.CheckCompanyByEmailRepository.checkEmail(
      accountData.email
    );
    const cnpjExists = await this.checkAccountByCnpjRepository.checkCnpj(
      accountData.cnpj
    );
    if (emailExists || cnpjExists) {
      return false;
    }
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
