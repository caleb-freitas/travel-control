import { IAccountModel } from "../../../domain/models/account.model";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../../domain/usecases/add.account";
import { IHasher } from "../../protocols/cryptography/hasher";
import { IAddAccountRepository } from "../../protocols/database/add.account.repository";

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
