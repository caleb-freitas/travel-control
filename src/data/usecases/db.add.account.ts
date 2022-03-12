import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from ".";
import { ICheckAccountByCnpjRepository } from "../protocols/database/check.account.by.cnpj.repository";
import { ICheckAccountByEmailRepository } from "../protocols/database/check.account.by.email.repository";

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
    private readonly checkAccountByCnpjRepository: ICheckAccountByCnpjRepository
  ) {}
  async add(accountData: IAddAccountModel): Promise<IAccountModel | boolean> {
    const emailExists = await this.checkAccountByEmailRepository.checkEmail(
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