import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from ".";
import { ICheckAccountByEmailRepository } from "../protocols/database/check.account.by.email.repository";

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository
  ) {}
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.checkAccountByEmailRepository.checkEmail(accountData.email);
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
