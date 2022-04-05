import {
  CompanyRepository,
  DriverRepository,
  prisma,
  LoadDriverByEmailRepository,
} from "@/infra/repositories";

describe("LoadDriverByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    const driverRepository = new DriverRepository();
    const company = await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    });
    await driverRepository.add({
      company_id: company.id,
      name: "any_name",
      email: "driver@email.com",
      password: "any_password",
      drivers_license: "any_drivers_license",
    });
  });

  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should load the correct driver with the provided email", async () => {
    const sut = new LoadDriverByEmailRepository();
    const company = await sut.loadByEmail("driver@email.com");
    expect(company).toHaveProperty("id");
    expect(company).toHaveProperty("email", "driver@email.com");
  });
});
