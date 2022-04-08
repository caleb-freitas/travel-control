import {
  CheckCompanyIdRepository,
  CompanyRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function checkCompanyIdSut(): CheckCompanyIdRepository {
  return new CheckCompanyIdRepository();
}

describe("CheckCompanyIdRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return false if a company id does not exists", async () => {
    const sut = checkCompanyIdSut();
    const response = await sut.checkId("non-existing company id");
    expect(response).toBe(false);
  });

  test("should return true if a company id exists", async () => {
    const sut = checkCompanyIdSut();
    const companyRepository = new CompanyRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const response = await sut.checkId(company.id);
    expect(response).toBe(true);
  });
});
