import { DbAddAccount } from "../../../data/usecases/add.account/db.add.account";
import { IAddAccount } from "../../../domain/usecases/add.account";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt.adapter/bcrypt.adapter";
import { AccountPrismaRepository } from "../../../infra/database/prisma/account/account.prisma.repository";

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountPrismaRepository = new AccountPrismaRepository();
  return new DbAddAccount(bcryptAdapter, accountPrismaRepository);
};
