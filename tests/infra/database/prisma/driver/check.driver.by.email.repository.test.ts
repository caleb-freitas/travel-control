import { CheckDriverByEmailRepository, CompanyRepository, DriverRepository, prisma } from "@/infra/database";


function makeDriverRepository(): DriverRepository {
  return new DriverRepository();
}

function makeCompanyRepository(): CompanyRepository {
  return new CompanyRepository();
}

function makeSut(): CheckDriverByEmailRepository {
  return new CheckDriverByEmailRepository();
}

describe("CheckDriverByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = makeCompanyRepository()
    const driverRepository = makeDriverRepository();
    const company = await companyRepository.add({
      name: "any_name",
      email: "registered@email.com",
      password: "ValidPass1234",
      cnpj: "30.270.488/0001-38",
    });
    await driverRepository.add({
      company_id: company.id,
      name: "any_name",
      email: "registered@email.com",
      password: "ValidPass1234",
      drivers_license: "any_drivers_license",
    });
  });

  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return true if an email was registered", async () => {
    const sut = makeSut();
    const response = await sut.checkEmail("registered@email.com");
    expect(response).toBe(true);
  });

  test("should return false if an email was not registered", async () => {
    const sut = makeSut();
    const response = await sut.checkEmail("non-registered@email.com");
    expect(response).toBe(false);
  });
});

