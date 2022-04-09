import {
  CompanyRepository,
  prisma,
  LoadAccountByTokenRepository,
  UpdateCompanyTokenRepository,
  UpdateDriverTokenRepository,
  DriverRepository,
} from "@/infra/repositories";
import { mockCompanyParams, mockDriverParams } from "@/tests/domain/mocks";

function loadAccountTokenSut(): LoadAccountByTokenRepository {
  return new LoadAccountByTokenRepository();
}

describe("LoadAccountByTokenRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    const driverRepository = new DriverRepository();
    const updateCompanyToken = new UpdateCompanyTokenRepository();
    const updateDriverToken = new UpdateDriverTokenRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const driver = await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
    await updateCompanyToken.updateAccessToken(company.id, "company_token");
    await updateDriverToken.updateAccessToken(driver.id, "driver_token");
  });

  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return a company with company token", async () => {
    const sut = loadAccountTokenSut();
    const { account: companyAccount } = await sut.loadByToken("company_token");
    expect(companyAccount.access_token).toBe("company_token");
  });

  test("should return a driver with driver token", async () => {
    const sut = loadAccountTokenSut();
    const { account: driverAccount } = await sut.loadByToken("driver_token");
    expect(driverAccount.access_token).toBe("driver_token");
  });

  test("should return null if the provided access token does not exist", async () => {
    const sut = loadAccountTokenSut();
    const response = await sut.loadByToken("invalid_token");
    expect(response).toBeNull();
  });
});
