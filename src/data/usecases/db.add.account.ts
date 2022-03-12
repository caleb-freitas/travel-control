import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from ".";
import { FieldInUseError } from "../../presentation/errors";
import { ICheckAccountByEmailRepository } from "../protocols/database/check.account.by.email.repository";

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository
  ) {}
  async add(accountData: IAddAccountModel): Promise<IAccountModel | boolean> {
    const emailExists = await this.checkAccountByEmailRepository.checkEmail(
      accountData.email
    );
    if (emailExists) {
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
