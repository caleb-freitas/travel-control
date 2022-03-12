import { AccountPrismaRepository } from "../../../../../src/infra/database/prisma/account/account.prisma.repository";
import { CheckAccountByEmailRepository } from "../../../../../src/infra/database/prisma/account/check.account.by.email.repository";
import { prisma } from "../../../../../src/infra/database/prisma/prisma.client";

function makeAccountPrismaRepository(): AccountPrismaRepository {
  return new AccountPrismaRepository();
}

function makeSut(): CheckAccountByEmailRepository {
  return new CheckAccountByEmailRepository();
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

  test("should return true if an email was registered", async () => {
    const sut = makeSut();
    const response = await sut.checkEmail("registered@email.com");
    expect(response).toBe(true);
  });

  test("should return false if an email was not registered", async () => {
    const sut = makeSut();
    const response = await sut.checkEmail("non-registered@email.com");
    expect(response).toBe(false);
  });
});
