import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest } from "../helpers/http.helper";
import { IPasswordValidator } from "../protocols";
import { CompanySignUpController } from "./company.signup.controller";

interface ISutTypes {
  sut: CompanySignUpController;
  passwordValidatorAdapterStub: IPasswordValidator;
}

function makePasswordValidator(): IPasswordValidator {
  class PasswordValidatorStub implements IPasswordValidator {
    isValid(password: string): boolean {
      return true;
    }
  }
  return new PasswordValidatorStub();
}

function makeSut(): ISutTypes {
  const passwordValidatorAdapterStub = makePasswordValidator();
  const sut = new CompanySignUpController(passwordValidatorAdapterStub);
  return { sut, passwordValidatorAdapterStub };
}

describe("CompanySignUpController", () => {
  describe("Validate required fields", () => {
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

    test("should return 400 if no cnpj is provided", async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "valid_password",
          passwordConfirmation: "valid_password",
          country: "valid_country",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(badRequest(new MissingParamError("cnpj")));
    });

    test("should return 400 if no password is provided", async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          passwordConfirmation: "valid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(badRequest(new MissingParamError("password")));
    });

    test("should return 400 if no passwordConfirmation is provided", async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "valid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(
        badRequest(new MissingParamError("passwordConfirmation"))
      );
    });
  });

  describe("Password  validation", () => {
    test("should return 400 if password and passwordConfirmation are not equals", async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "valid_password",
          passwordConfirmation: "invalid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(
        badRequest(new InvalidParamError("passwordConfirmation"))
      );
    });

    test("should call PasswordValidatorAdapter with correct password", async () => {
      const { sut, passwordValidatorAdapterStub } = makeSut();
      const isValidSpy = jest.spyOn(passwordValidatorAdapterStub, "isValid");
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "valid_password",
          passwordConfirmation: "valid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      await sut.handle(httpRequest);
      expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.password);
    });
  });
});
