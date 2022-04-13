import {
  AddCompanyRepository,
  AddDriverRepository,
  prisma,
  LoadDriverByEmailRepository,
} from "@/infra/repositories";
import { mockCompanyParams, mockDriverParams } from "@/tests/domain/mocks";

function loadDriverEmailSut(): LoadDriverByEmailRepository {
  return new LoadDriverByEmailRepository();
}

describe("LoadDriverByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new AddCompanyRepository();
    const driverRepository = new AddDriverRepository();
    const company = await companyRepository.add(mockCompanyParams());
    await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
  });

  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should load the correct driver with the provided email", async () => {
    const sut = loadDriverEmailSut();
    const company = await sut.loadByEmail("driver@email.com");
    expect(company).toHaveProperty("id");
    expect(company).toHaveProperty("email", "driver@email.com");
  });
});
