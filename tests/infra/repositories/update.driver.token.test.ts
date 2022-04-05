import { ICompanyModel } from "@/domain/models";
import {
  CompanyRepository,
  DriverRepository,
  LoadDriverByEmailRepository,
  prisma,
  UpdateDriverTokenRepository,
} from "@/infra/repositories";

describe("UpdateDriverTokenRepository", () => {
  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should update the correct company access token", async () => {
    const sut = new UpdateDriverTokenRepository();
    const companyRepository = new CompanyRepository();
    const driverRepository = new DriverRepository();
    const loadDriver = new LoadDriverByEmailRepository();
    const company: ICompanyModel = await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    });
    const driver = await driverRepository.add({
      company_id: company.id,
      name: "any_name",
      email: "driver@email.com",
      password: "any_password",
      drivers_license: "any_drivers_license",
    });
    await sut.updateAccessToken(driver.id, "new_token");
    const newDriver = await loadDriver.loadByEmail("driver@email.com");
    expect(newDriver.access_token).toBe("new_token");
  });
});
