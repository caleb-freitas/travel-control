import { AddCompanyRepository, prisma } from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function companyRepositorySut(): AddCompanyRepository {
  return new AddCompanyRepository();
}

describe("AddCompanyRepository", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should persist company account data", async () => {
    const sut = companyRepositorySut();
    const companyAccount = await sut.add(mockCompanyParams());
    expect(companyAccount).toHaveProperty("id");
  });
});
