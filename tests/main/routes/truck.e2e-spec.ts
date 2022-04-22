import { prisma } from "@/infra/repositories";
import app from "@/main/config/app";
import request from "supertest";

describe("POST /api/truck", () => {
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
    const deleteTrucks = prisma.truck.deleteMany();
    await prisma.$transaction([deleteTrucks, deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return 200 on the creation of a truck with a valid accessToken", async () => {
    const companyLogin = await request(app).post("/api/login").send({
      email: "company@email.com",
      password: "ValidPassword1234",
      role: "company",
    });
    await request(app)
      .post("/api/truck")
      .set("x-access-token", companyLogin.body?.accessToken)
      .send({
        license_plate: "ABC1B34",
        ton_capacity: 30,
        brand: "VW",
        model: "Meteor",
      })
      .expect(200);
  });
});
