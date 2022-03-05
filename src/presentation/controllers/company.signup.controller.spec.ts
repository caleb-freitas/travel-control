import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { IHttpRequest } from "../protocols";
import { CompanySignUpController } from "./company.signup.controller";

interface ISutTypes {
  sut: CompanySignUpController;
}

function makeSut(): ISutTypes {
  const sut = new CompanySignUpController();
  return { sut };
}

describe("CompanySignUpController", () => {
  test("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
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

  test("should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        password: "valid_password",
        passwordConfirmation: "valid_password",
        country: "valid_country",
        cnpj: "valid_cnpj",
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new MissingParamError("email")));
  });

  test("should return 400 if no country is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid@mail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
        cnpj: "valid_cnpj",
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new MissingParamError("country")));
  });
});
