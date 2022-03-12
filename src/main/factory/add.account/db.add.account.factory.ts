import { DbAddAccount } from "../../../data/usecases/db.add.account";
import { IAddAccount } from "../../../domain/usecases/add.account";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt.adapter/bcrypt.adapter";
import { AccountPrismaRepository } from "../../../infra/database/prisma/account/account.prisma.repository";
import { CheckAccountByCnpjRepository } from "../../../infra/database/prisma/account/check.account.by.cnpj.repository";
import { CheckAccountByEmailRepository } from "../../../infra/database/prisma/account/check.account.by.email.repository";

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountPrismaRepository = new AccountPrismaRepository();
  const checkAccountByEmailRepository = new CheckAccountByEmailRepository();
  const checkAccountByCnpjRepository = new CheckAccountByCnpjRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountPrismaRepository,
    checkAccountByEmailRepository,
    checkAccountByCnpjRepository
  );
};
