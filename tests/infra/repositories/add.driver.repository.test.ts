import { IAddDriverRepository } from "@/data/protocols";
import { IAddDriverModel } from "@/domain/usecases";
import {
  CompanyRepository,
  DriverRepository,
  prisma,
} from "@/infra/repositories";

function makeSut(): IAddDriverRepository {
  return new DriverRepository();
}

describe("DriverRepository", () => {
  afterAll(async () => {
    const deleteDrivers = prisma.driver.deleteMany();
    await prisma.$transaction([deleteDrivers]);
    await prisma.$disconnect();
  });

  test("should add a new driver account", async () => {
    const sut = makeSut();
    const companyRepository = new CompanyRepository();
    const companyAccount = await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "password",
      cnpj: "cnpj",
    });
    const driverAccount: IAddDriverModel = await sut.add({
      company_id: companyAccount.id,
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
      drivers_license: "any_drivers_license",
    });
    expect(driverAccount).toHaveProperty("id");
    expect(driverAccount).toHaveProperty("company_id");
  });
});
