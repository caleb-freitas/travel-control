import { IAddCompanyModel } from "../../../../../src/data/usecases/db.add.company.protocols";
import { CompanyRepository } from "../../../../../src/infra/database/prisma/company/company.repository";
import { prisma } from "../../../../../src/infra/database/prisma/prisma.client";

function makeSut(): CompanyRepository {
  return new CompanyRepository();
}

describe("CompanyRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should create a new company account", async () => {
    const sut = makeSut();
    const account: IAddCompanyModel = {
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    };
    const response = await sut.add(account);
    expect(response).toHaveProperty("id");
  });
});
