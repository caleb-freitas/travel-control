import { IAddDriverRepository } from "@/data/protocols";
import { IAddDriverModel } from "@/domain/usecases";
import {
  AddCompanyRepository,
  AddDriverRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams, mockDriverParams } from "@/tests/domain/mocks";

function driverRepositorySut(): AddDriverRepository {
  return new AddDriverRepository();
}

describe("AddDriverRepository", () => {
  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    await prisma.$transaction([deleteDrivers]);
    await prisma.$disconnect();
  });

  test("should add a new driver account", async () => {
    const sut = driverRepositorySut();
    const companyRepository = new AddCompanyRepository();
    const companyAccount = await companyRepository.add(mockCompanyParams());
    const driverAccount = await sut.add({
      ...mockDriverParams(),
      company_id: companyAccount.id,
    });
    expect(driverAccount).toHaveProperty("id");
  });
});
