import { prisma } from "@/infra/repositories";
import app from "@/main/config/app";
import request from "supertest";

describe("POST /api/login", () => {
  beforeAll(async () => {
    await request(app).post("/api/signup/company").send({
      name: "Company",
      email: "company@email.com",
      password: "ValidPassword1234",
      passwordConfirmation: "ValidPassword1234",
      cnpj: "19.587.837/0001-07",
    });
  });

  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return 200 on correct company login", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "company@email.com",
        password: "ValidPassword1234",
        role: "company",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.accessToken).toBeTruthy();
      });
  });

  test("should return 401 if non-registered email is provided", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "invalid@email.com",
        password: "ValidPassword1234",
        role: "company",
      })
      .expect(401);
  });
});
