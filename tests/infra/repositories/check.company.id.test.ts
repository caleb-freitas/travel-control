import {
  CheckCompanyIdRepository,
  CompanyRepository,
  prisma,
} from "@/infra/repositories";

function makeCompanyRepository() {
  return new CompanyRepository();
}

function makeSut() {
  return new CheckCompanyIdRepository();
}

describe("CheckCompanyIdRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return false if a company id does not exists", async () => {
    const sut = makeSut();
    const response = await sut.checkId("non-existing company id");
    expect(response).toBe(false);
  });

  test("should return true if a company id exists", async () => {
    const sut = makeSut();
    const companyRepository = makeCompanyRepository();
    const company = await companyRepository.add({
      name: "any_name",
      email: "registered@email.com",
      password: "ValidPass1234",
      cnpj: "30.270.488/0001-38",
    });
    const response = await sut.checkId(company.id);
    expect(response).toBe(true);
  });
});
