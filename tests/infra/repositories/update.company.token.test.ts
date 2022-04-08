import { ICompanyModel } from "@/domain/models";
import {
  CompanyRepository,
  LoadCompanyByEmailRepository,
  prisma,
  UpdateCompanyTokenRepository,
} from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function updateCompanyTokenSut(): UpdateCompanyTokenRepository {
  return new UpdateCompanyTokenRepository();
}

describe("UpdateCompanyTokenRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should update the correct company access token", async () => {
    const sut = updateCompanyTokenSut();
    const companyRepository = new CompanyRepository();
    const loadCompany = new LoadCompanyByEmailRepository();
    const company = await companyRepository.add(mockCompanyParams());
    await sut.updateAccessToken(company.id, "new_token");
    const companyAccount = await loadCompany.loadByEmail("company@email.com");
    expect(companyAccount.access_token).toBe("new_token");
  });
});
