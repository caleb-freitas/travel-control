import { prisma } from "@/infra/repositories";
import app from "@/main/config/app";
import request from "supertest";

describe("POST /api/company", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return 200 on company signup", async () => {
    await request(app)
      .post("/api/company")
      .send({
        name: "Company",
        email: "company@email.com",
        password: "ValidPassword1234",
        passwordConfirmation: "ValidPassword1234",
        cnpj: "19.587.837/0001-07",
      })
      .expect(200);
  });
});
