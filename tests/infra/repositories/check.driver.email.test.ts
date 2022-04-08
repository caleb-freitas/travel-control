import {
  CheckDriverByEmailRepository,
  CompanyRepository,
  DriverRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams, mockDriverParams } from "@/tests/domain/mocks";

function checkDriverEmailSut(): CheckDriverByEmailRepository {
  return new CheckDriverByEmailRepository();
}

describe("CheckDriverByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    const driverRepository = new DriverRepository();
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

  test("should return true if an email was registered", async () => {
    const sut = checkDriverEmailSut();
    const response = await sut.checkEmail("driver@email.com");
    expect(response).toBe(true);
  });

  test("should return false if an email was not registered", async () => {
    const sut = checkDriverEmailSut();
    const response = await sut.checkEmail("non-registered@email.com");
    expect(response).toBe(false);
  });
});
