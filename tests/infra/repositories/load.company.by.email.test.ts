import {
  CompanyRepository,
  LoadCompanyByEmailRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function loadCompanyEmailSut(): LoadCompanyByEmailRepository {
  return new LoadCompanyByEmailRepository();
}

describe("LoadCompanyByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    await companyRepository.add(mockCompanyParams());
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should load the correct company with the provided email", async () => {
    const sut = loadCompanyEmailSut();
    const company = await sut.loadByEmail("company@email.com");
    expect(company).toHaveProperty("id");
    expect(company).toHaveProperty("email", "company@email.com");
  });
});
