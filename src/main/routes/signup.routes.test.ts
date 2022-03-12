import request from "supertest";

import app from "../config/app";

describe("POST /api/signup", () => {
  test("should return 200 on signup", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "user",
        email: "user1@mail.com",
        password: "AnyPassword1234",
        passwordConfirmation: "AnyPassword1234",
        cnpj: "19.587.837/0001-07",
      })
      .expect(200);
  });
});
