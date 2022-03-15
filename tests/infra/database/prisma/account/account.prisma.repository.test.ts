import { IAddAccountModel } from "../../../../../src/data/usecases/db.add.account.protocols";
import { AccountPrismaRepository } from "../../../../../src/infra/database/prisma/account/account.prisma.repository";
import { prisma } from "../../../../../src/infra/database/prisma/prisma.client";

function makeSut(): AccountPrismaRepository {
  return new AccountPrismaRepository();
}

describe("AccountPrismaRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should create a new company account", async () => {
    const sut = makeSut();
    const account: IAddAccountModel = {
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    };
    const response = await sut.add(account);
    expect(response).toHaveProperty("id");
  });
});
