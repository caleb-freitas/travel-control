import { ICheckCompanyByCnpjRepository } from "../../../../../src/data/protocols/database/company/check.company.by.cnpj.repository";
import { CheckCompanyByCnpjRepository } from "../../../../../src/infra/database/prisma/company/check.account.by.cnpj.repository";
import { CompanyRepository } from "../../../../../src/infra/database/prisma/company/company.repository";
import { prisma } from "../../../../../src/infra/database/prisma/prisma.client";

function makeCompanyRepository(): CompanyRepository {
  return new CompanyRepository();
}

function makeSut(): ICheckCompanyByCnpjRepository {
  return new CheckCompanyByCnpjRepository();
}

describe("CheckCompanyByEmailRepository", () => {
  beforeAll(async () => {
    const CompanyRepository = makeCompanyRepository();
    await CompanyRepository.add({
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
