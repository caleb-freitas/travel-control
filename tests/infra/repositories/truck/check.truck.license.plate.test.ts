import { ICheckTruckLicensePlateRepository } from "@/data/protocols";
import {
  AddCompanyRepository,
  CheckTruckByLicensePlateRepository,
  AddTruckRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams, mockTruckParams } from "@/tests/domain/mocks";

function checkTruckEmailSut(): ICheckTruckLicensePlateRepository {
  return new CheckTruckByLicensePlateRepository();
}

describe("CheckTruckByLicensePlateRepository", () => {
  beforeAll(async () => {
    const companyRepository = new AddCompanyRepository();
    const truckRepository = new AddTruckRepository();
    const company = await companyRepository.add(mockCompanyParams());
    await truckRepository.add({
      ...mockTruckParams(),
      company_id: company.id,
    });
  });

  afterAll(async () => {
    const deleteTrucks = prisma.truck.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteTrucks, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return true if an email was registered", async () => {
    const sut = checkTruckEmailSut();
    const response = await sut.check(mockTruckParams().license_plate);
    expect(response).toBe(true);
  });

  test("should return false if an email was not registered", async () => {
    const sut = checkTruckEmailSut();
    const response = await sut.check("invalid_license_plate");
    expect(response).toBe(false);
  });
});
