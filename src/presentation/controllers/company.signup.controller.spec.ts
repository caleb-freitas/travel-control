import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { IHttpRequest } from "../protocols";
import { CompanySignUpController } from "./company.signup.controller";

interface ISutTypes {
  sut: CompanySignUpController;
}

function makeFakeRequest(): IHttpRequest {
  return {
    body: {
      email: "valid@mail.com",
      password: "valid_password",
      passwordConfirmation: "valid_password",
      country: "valid_country",
      cnpj: "valid_cnpj",
    },
  };
}

function makeSut(): ISutTypes {
  const sut = new CompanySignUpController();
  return { sut };
}

describe("CompanySignUpController", () => {
  test("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new MissingParamError("name")));
  });
});
