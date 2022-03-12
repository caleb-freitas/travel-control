import { prisma } from "../prisma.client";
import { AccountPrismaRepository } from "./account.prisma.repository";
import { CheckAccountByEmailRepository } from "./check.account.by.emai.repository";

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
