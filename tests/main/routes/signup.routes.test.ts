import request from "supertest";

import { prisma } from "../../../src/infra/database/prisma/prisma.client";
import app from "../../../src/main/config/app";

describe("POST /api/company/signup", () => {
  afterAll(async () => {
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([deleteCompanies]);
    await prisma.$disconnect();
  });

  test("should return 200 on signup", async () => {
    await request(app)
      .post("/api/company/signup")
      .send({
        name: "Company Name",
        email: "company@email.com",
        password: "ValidPassword1234",
        passwordConfirmation: "ValidPassword1234",
        cnpj: "19.587.837/0001-07",
      })
      .expect(200);
  });
});
