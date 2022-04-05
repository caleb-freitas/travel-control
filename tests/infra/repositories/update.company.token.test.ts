import { ICompanyModel } from "@/domain/models";
import {
  CompanyRepository,
  LoadCompanyByEmailRepository,
  prisma,
  UpdateCompanyTokenRepository,
} from "@/infra/repositories";

describe("UpdateCompanyTokenRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should update the correct company access token", async () => {
    const sut = new UpdateCompanyTokenRepository();
    const companyRepository = new CompanyRepository();
    const loadCompany = new LoadCompanyByEmailRepository();
    const company: ICompanyModel = await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    });
    await sut.updateAccessToken(company.id, "new_token");
    const newCompany = await loadCompany.loadByEmail("company@email.com");
    expect(newCompany.access_token).toBe("new_token");
  });
});
