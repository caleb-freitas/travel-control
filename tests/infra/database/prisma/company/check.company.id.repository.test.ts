import { CheckCompanyIdRepository } from "../../../../../src/infra/database/prisma/company/check.company.id.repository";

describe("CheckCompanyIdRepository", () => {
  test("should return false if a company id does not exists", async () => {
    const sut = new CheckCompanyIdRepository();
    const response = await sut.checkId("non-existing company id");
    expect(response).toBe(false)
  });
});