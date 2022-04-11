import { ICheckCompanyByCnpjRepository } from "@/data/protocols/database";
import {
  CheckCompanyByCnpjRepository,
  AddCompanyRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function checkCompanyCnpjSut(): CheckCompanyByCnpjRepository {
  return new CheckCompanyByCnpjRepository();
}

describe("CheckCompanyByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new AddCompanyRepository();
    await companyRepository.add(mockCompanyParams());
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return true if an cnpj was registered", async () => {
    const sut = checkCompanyCnpjSut();
    const response = await sut.checkCnpj("company_cnpj");
    expect(response).toBe(true);
  });

  test("should return false if an cnpj was not registered", async () => {
    const sut = checkCompanyCnpjSut();
    const response = await sut.checkCnpj("invalid_cnpj");
    expect(response).toBe(false);
  });
});
