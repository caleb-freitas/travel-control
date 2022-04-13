import {
  AddCompanyRepository,
  AddDriverRepository,
  LoadDriverByEmailRepository,
  prisma,
  UpdateDriverTokenRepository,
} from "@/infra/repositories";
import { mockCompanyParams, mockDriverParams } from "@/tests/domain/mocks";

function updateDriverTokenSut(): UpdateDriverTokenRepository {
  return new UpdateDriverTokenRepository();
}

describe("UpdateDriverTokenRepository", () => {
  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should update the correct company access token", async () => {
    const sut = updateDriverTokenSut();
    const companyRepository = new AddCompanyRepository();
    const driverRepository = new AddDriverRepository();
    const loadDriver = new LoadDriverByEmailRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const driver = await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
    await sut.updateAccessToken(driver.id, "new_token");
    const newDriver = await loadDriver.loadByEmail("driver@email.com");
    expect(newDriver.access_token).toBe("new_token");
  });
});
