import {
  AddCompanyRepository,
  AddDriverRepository,
  AddExpenseRepository,
  AddTruckRepository,
  prisma,
} from "@/infra/repositories";
import { AddTravelRepository } from "@/infra/repositories/travel/add.travel";
import {
  mockCompanyParams,
  mockDriverParams,
  mockExpenseParams,
  mockTravelParams,
  mockTruckParams,
} from "@/tests/domain/mocks";

function travelRepositorySut(): AddTravelRepository {
  return new AddTravelRepository();
}

describe("AddTravelRepository", () => {
  afterAll(async () => {
    const deleteExpenses = prisma.expense.deleteMany();
    const deleteTravels = prisma.travel.deleteMany();
    const deleteTrucks = prisma.truck.deleteMany();
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([
      deleteExpenses,
      deleteTravels,
      deleteTrucks,
      deleteDrivers,
      deleteCompanies,
    ]);
    await prisma.$disconnect();
  });

  test("should add a new expense", async () => {
    const sut = travelRepositorySut();
    const companyRepository = new AddCompanyRepository();
    const driverRepository = new AddDriverRepository();
    const truckRepository = new AddTruckRepository();
    const expenseRepository = new AddExpenseRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const driver = await driverRepository.add({
      ...mockDriverParams(),
      company_id: company.id,
    });
    const truck = await truckRepository.add({
      ...mockTruckParams(),
      company_id: company.id,
    });
    const travel = await sut.add({
      ...mockTravelParams(),
      company_id: company.id,
      driver_id: driver.id,
      truck_id: truck.id,
    });
    const expense = await expenseRepository.add({
      ...mockExpenseParams(),
      travel_id: travel.id,
    });
    expect(expense).toHaveProperty("id");
  });
});
