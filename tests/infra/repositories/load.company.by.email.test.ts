import {
  CompanyRepository,
  LoadCompanyByEmailRepository,
  prisma,
} from "@/infra/repositories";

describe("LoadCompanyByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new CompanyRepository();
    await companyRepository.add({
      name: "company",
      email: "company@email.com",
      password: "ValidPass1234",
      cnpj: "30.270.488/0001-38",
    });
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should load the correct company with the provided email", async () => {
    const sut = new LoadCompanyByEmailRepository();
    const company = await sut.loadByEmail("company@email.com");
    expect(company).toHaveProperty("id");
    expect(company).toHaveProperty("email", "company@email.com");
  });
});
