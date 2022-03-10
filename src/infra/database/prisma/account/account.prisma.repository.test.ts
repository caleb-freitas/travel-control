import { IAddAccountModel } from "../../../../domain/usecases/add.account";
import { prisma } from "../prisma.client";
import { AccountPrismaRepository } from "./account.prisma.repository";

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
