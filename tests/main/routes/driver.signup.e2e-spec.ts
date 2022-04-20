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
    const deleteDrivers = prisma.driver.deleteMany();
    await prisma.$transaction([deleteDrivers, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return 200 on driver signup with valid accessToken", async () => {
    const companyLogin = await request(app).post("/api/login").send({
      email: "company@email.com",
      password: "ValidPassword1234",
      role: "company",
    });
    await request(app)
      .post("/api/signup/driver")
      .set("x-access-token", companyLogin.body?.accessToken)
      .send({
        name: "Driver",
        email: "driver@email.com",
        password: "ValidPassword1234",
        passwordConfirmation: "ValidPassword1234",
        drivers_license: "000-000",
      })
      .expect(200);
  });

  test("should return 403 if no accessToken is provided", async () => {
    const companyLogin = await request(app).post("/api/login").send({
      email: "company@email.com",
      password: "ValidPassword1234",
      role: "company",
    });
    await request(app)
      .post("/api/signup/driver")
      .send({
        name: "Driver",
        email: "driver@email.com",
        password: "ValidPassword1234",
        passwordConfirmation: "ValidPassword1234",
        drivers_license: "000-000",
      })
      .expect(403);
  });
});
