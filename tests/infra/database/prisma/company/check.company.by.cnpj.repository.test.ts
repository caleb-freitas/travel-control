import { ICheckCompanyByCnpjRepository } from "@/data/protocols/database";
import { CheckCompanyByCnpjRepository, CompanyRepository, prisma } from "@/infra/database";

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
