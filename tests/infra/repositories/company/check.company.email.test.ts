import {
  CheckCompanyByEmailRepository,
  AddCompanyRepository,
  prisma,
} from "@/infra/repositories";
import { mockCompanyParams } from "@/tests/domain/mocks";

function checkCompanyEmailSut(): CheckCompanyByEmailRepository {
  return new CheckCompanyByEmailRepository();
}

describe("CheckCompanyByEmailRepository", () => {
  beforeAll(async () => {
    const companyRepository = new AddCompanyRepository();
    await companyRepository.add(mockCompanyParams());
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return true if an email was registered", async () => {
    const sut = checkCompanyEmailSut();
    const response = await sut.checkEmail("company@email.com");
    expect(response).toBe(true);
  });

  test("should return false if an email was not registered", async () => {
    const sut = checkCompanyEmailSut();
    const response = await sut.checkEmail("non-registered@email.com");
    expect(response).toBe(false);
  });
});
