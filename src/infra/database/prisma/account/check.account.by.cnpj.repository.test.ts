import { ICheckAccountByCnpjRepository } from "../../../../data/protocols/database/check.account.by.cnpj.repository";
import { prisma } from "../prisma.client";
import { AccountPrismaRepository } from "./account.prisma.repository";
import { CheckAccountByCnpjRepository } from "./check.account.by.cnpj.repository";

function makeAccountPrismaRepository(): AccountPrismaRepository {
  return new AccountPrismaRepository();
}

function makeSut(): ICheckAccountByCnpjRepository {
  return new CheckAccountByCnpjRepository();
}

describe("CheckAccountByEmailRepository", () => {
  beforeAll(async () => {
    const accountPrismaRepository = makeAccountPrismaRepository();
    await accountPrismaRepository.add({
      name: "any_name",
      email: "registered@email.com",
      password: "ValidPass1234",
      cnpj: "30.270.488/0001-38",
    });
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return true if an cnpj was registered", async () => {
    const sut = makeSut();
    const response = await sut.checkCnpj("30.270.488/0001-38");
    expect(response).toBe(true);
  });

  test("should return false if an cnpj was not registered", async () => {
    const sut = makeSut();
    const response = await sut.checkCnpj("35.270.400/0001-30");
    expect(response).toBe(false);
  });
});
