import {
  AddCompanyRepository,
  AddDriverRepository,
  prisma,
  CheckTravelByIdRepository,
  AddTravelRepository,
  AddTruckRepository,
} from "@/infra/repositories";
import {
  mockCompanyParams,
  mockDriverParams,
  mockTravelParams,
  mockTruckParams,
} from "@/tests/domain/mocks";

function checkTravelIdSut(): CheckTravelByIdRepository {
  return new CheckTravelByIdRepository();
}

describe("CheckDriverByIdRepository", () => {
  afterAll(async () => {
    const deleteTravels = prisma.travel.deleteMany();
    const deleteTrucks = prisma.truck.deleteMany();
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([
      deleteTravels,
      deleteTrucks,
      deleteDrivers,
      deleteCompanies,
    ]);
    await prisma.$disconnect();
  });

  test("should return false if a travel id does not exists", async () => {
    const sut = checkTravelIdSut();
    const response = await sut.check("non-existing_driver_id");
    expect(response).toBe(false);
  });

  test("should return true if a travel id exists", async () => {
    const sut = checkTravelIdSut();
    const companyRepository = new AddCompanyRepository();
    const driverRepository = new AddDriverRepository();
    const travelRepository = new AddTravelRepository();
    const truckRepository = new AddTruckRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const driver = await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
    const truck = await truckRepository.add({
      ...mockTruckParams(),
      company_id: company.id,
    });
    const travel = await travelRepository.add({
      ...mockTravelParams(),
      company_id: company.id,
      driver_id: driver.id,
      truck_id: truck.id,
    });
    const response = await sut.check(travel.id);
    expect(response).toBe(true);
  });
});
