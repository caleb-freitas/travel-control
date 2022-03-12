import request from "supertest";

import app from "../../../src/main/config/app";

describe("BodyParser", () => {
  test("should parse body as json", async () => {
    app.post("/test_body_parser", (request, response) => {
      response.send(request.body);
    });
    await request(app)
      .post("/test_body_parser")
      .send({ name: "any_name" })
      .expect({ name: "any_name" });
  });
});
