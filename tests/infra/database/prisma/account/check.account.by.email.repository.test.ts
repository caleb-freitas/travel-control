import { CheckCompanyByEmailRepository } from "../../../../../src/infra/database/prisma/company/check.company.by.email.repository";
import { CompanyRepository } from "../../../../../src/infra/database/prisma/company/company.repository";
import { prisma } from "../../../../../src/infra/database/prisma/prisma.client";

function makeCompanyRepository(): CompanyRepository {
  return new CompanyRepository();
}

function makeSut(): CheckCompanyByEmailRepository {
  return new CheckCompanyByEmailRepository();
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
