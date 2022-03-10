import { IAddAccountRepository } from "../../../../data/protocols/database/add.account.repository";
import { IAccountModel } from "../../../../domain/models/account.model";
import { IAddAccountModel } from "../../../../domain/usecases/add.account";
import { prisma } from "../prisma.client";

export class AccountPrismaRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const { name, email, password, cnpj } = accountData;
    const account = await prisma.company.create({
      data: {
        name,
        email,
        password,
        cnpj,
      },
    });
    return account;
  }
}
