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
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.hasher.hash(account.password);
    await this.addAccountRepository.add(account);
    return {
      id: "string",
      name: "string",
      email: "string",
      password: "string",
      passwordConfirmation: "string",
      cnpj: "string",
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
