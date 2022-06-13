import { prisma } from "@/infra/repositories";
import app from "@/main/config/app";
import request from "supertest";

describe("POST /api/travel/:driver_id/:truck_id", () => {
  beforeAll(async () => {
    await request(app).post("/api/company").send({
      name: "Company",
      email: "company@email.com",
      password: "ValidPassword1234",
      passwordConfirmation: "ValidPassword1234",
      cnpj: "19.587.837/0001-07",
    });
  });

  afterAll(async () => {
    const deleteTravels = prisma.travel.deleteMany();
    const deleteTrucks = prisma.truck.deleteMany();
    const deleteDrivers = prisma.driver.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();
    await prisma.$transaction([
      deleteTravels,
      deleteTrucks,
      deleteDrivers,
      deleteCompanies,
    ]);
    await prisma.$disconnect();
  });

  test("should return 200 on the creation of a travel with valid values and accessToken", async () => {
    const companyLogin = await request(app).post("/api/login").send({
      email: "company@email.com",
      password: "ValidPassword1234",
      role: "company",
    });
    const driver = await request(app)
      .post("/api/signup/driver")
      .set("x-access-token", companyLogin.body?.accessToken)
      .send({
        name: "Driver",
        email: "driver@email.com",
        password: "ValidPassword1234",
        passwordConfirmation: "ValidPassword1234",
        drivers_license: "000-000",
      });
    const truck = await request(app)
      .post("/api/truck")
      .set("x-access-token", companyLogin.body?.accessToken)
      .send({
        license_plate: "ABC1B34",
        ton_capacity: 30,
        brand: "VW",
        model: "Meteor",
      });
    await request(app)
      .post(`/api/travel/${driver.body.id}/${truck.body.id}`)
      .set("x-access-token", companyLogin.body?.accessToken)
      .send({
        client: "Client",
        departure_city: "Departure City",
        departure_state: "Departure State",
        destination_city: "Destination City",
        destination_state: "Destination State",
        product: "Product",
        freight_value: 1000,
      })
      .expect(200);
  });
});
