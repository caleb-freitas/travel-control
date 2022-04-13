import {
  CheckDriverByIdRepository,
  AddCompanyRepository,
  AddDriverRepository,
  prisma,
} from "@/infra/repositories";
import {
  mockCompanyParams,
  mockDriverParams,
  mockTruckParams,
} from "@/tests/domain/mocks";

function checkDriverIdSut(): CheckDriverByIdRepository {
  return new CheckDriverByIdRepository();
}

describe("CheckDriverByIdRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    const deleteDrivers = prisma.driver.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return false if a driver id does not exists", async () => {
    const sut = checkDriverIdSut();
    const response = await sut.check("non-existing_driver_id");
    expect(response).toBe(false);
  });

  test("should return true if a driver id exists", async () => {
    const sut = checkDriverIdSut();
    const companyRepository = new AddCompanyRepository();
    const driverRepository = new AddDriverRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const driver = await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
    const response = await sut.check(driver.id);
    expect(response).toBe(true);
  });
});
