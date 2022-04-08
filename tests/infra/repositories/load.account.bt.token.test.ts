import {
  CompanyRepository,
  prisma,
  LoadAccountByTokenRepository,
  UpdateCompanyTokenRepository,
  UpdateDriverTokenRepository,
  DriverRepository,
} from "@/infra/repositories";

describe("LoadAccountByTokenRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    const driverRepository = new DriverRepository();
    const updateCompanyToken = new UpdateCompanyTokenRepository();
    const updateDriverToken = new UpdateDriverTokenRepository();
    const company = await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "ValidPass1234",
      cnpj: "30.270.488/0001-38",
    });
    const driver = await driverRepository.add({
      company_id: company.id,
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
      drivers_license: "any_drivers_license",
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
    const sut = new LoadAccountByTokenRepository();
    const { account } = await sut.loadByToken("company_token");
    expect(account.access_token).toBe("company_token");
  });

  test("should return a driver with driver token", async () => {
    const sut = new LoadAccountByTokenRepository();
    const { account } = await sut.loadByToken("driver_token");
    expect(account.access_token).toBe("driver_token");
  });

  test("should return null if the provided access token does not exist", async () => {
    const sut = new LoadAccountByTokenRepository();
    const response = await sut.loadByToken("invalid_token");
    expect(response).toBeNull();
  });
});
