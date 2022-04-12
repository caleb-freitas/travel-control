import { IAddTruckRepository } from "@/data/protocols";
import {
  AddCompanyRepository,
  AddTruckRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams, mockTruckParams } from "@/tests/domain/mocks";

function truckRepositorySut(): IAddTruckRepository {
  return new AddTruckRepository();
}

describe("AddTruckRepository", () => {
  afterAll(async () => {
    const deleteTrucks = prisma.truck.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteTrucks, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should add a new truck", async () => {
    const sut = truckRepositorySut();
    const companyRepository = new AddCompanyRepository();
    const company = await companyRepository.add(mockCompanyParams());
    const truck = await sut.add({
      ...mockTruckParams(),
      company_id: company.id,
    });
    expect(truck).toHaveProperty("id");
  });
});
