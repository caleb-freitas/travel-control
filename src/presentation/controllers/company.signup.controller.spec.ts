import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { CompanySignUpController } from "./company.signup.controller";

describe("CompanySignUpController", () => {
  test("should return 400 if no name is provided", async () => {
    const sut = new CompanySignUpController();
    const httpRequest = {
      body: {
        email: "valid@mail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
        country: "valid_country",
        cnpj: "valid_cnpj",
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new MissingParamError("name")));
  });
});
