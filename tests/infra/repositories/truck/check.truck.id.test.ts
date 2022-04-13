import {
  CheckTruckByIdRepository,
  AddCompanyRepository,
  AddTruckRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams, mockTruckParams } from "@/tests/domain/mocks";

function checkTruckIdSut(): CheckTruckByIdRepository {
  return new CheckTruckByIdRepository();
}

describe("CheckTruckByIdRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    const deleteTrucks = prisma.truck.deleteMany();
    await prisma.$transaction([deleteTrucks, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return false if a truck id does not exists", async () => {
    const sut = checkTruckIdSut();
    const response = await sut.check("non-existing_truck_id");
    expect(response).toBe(false);
  });

  test("should return true if a truck id exists", async () => {
    const sut = checkTruckIdSut();
    const companyRepository = new AddCompanyRepository();
    const truckRepository = new AddTruckRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const truck = await truckRepository.add({
      ...mockTruckParams(),
      company_id: company.id,
    });
    const response = await sut.check(truck.id);
    expect(response).toBe(true);
  });
});
