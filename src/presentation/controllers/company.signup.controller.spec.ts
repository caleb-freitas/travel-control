import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http.helper";
import { IPasswordValidator, IEmailValidator } from "../protocols";
import { CompanySignUpController } from "./company.signup.controller";

interface ISutTypes {
  sut: CompanySignUpController;
  passwordValidatorStub: IPasswordValidator;
  emailValidatorStub: IEmailValidator;
}

function makePasswordValidator(): IPasswordValidator {
  class PasswordValidatorStub implements IPasswordValidator {
    isValid(password: string): boolean {
      return true;
    }
  }
  return new PasswordValidatorStub();
}

function makeEmailValidator(): IEmailValidator {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
}

function makeSut(): ISutTypes {
  const passwordValidatorStub = makePasswordValidator();
  const emailValidatorStub = makeEmailValidator();
  const sut = new CompanySignUpController(
    passwordValidatorStub,
    emailValidatorStub
  );
  return { sut, passwordValidatorStub, emailValidatorStub };
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

  describe("Password validation", () => {
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
      const { sut, passwordValidatorStub } = makeSut();
      const isValidSpy = jest.spyOn(passwordValidatorStub, "isValid");
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

    test("should return 400 if provided password does not meet the requirements", async () => {
      const { sut, passwordValidatorStub } = makeSut();
      jest.spyOn(passwordValidatorStub, "isValid").mockReturnValueOnce(false);
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "invalid",
          passwordConfirmation: "invalid",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response.body).toEqual(new InvalidParamError("password"));
    });

    test("should throw if PasswordValidatorAdapter throws", async () => {
      const { sut, passwordValidatorStub } = makeSut();
      jest
        .spyOn(passwordValidatorStub, "isValid")
        .mockImplementationOnce(() => {
          throw new Error();
        });
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
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(serverError(new Error()));
    });
  });

  describe("Email validation", () => {
    test("should call EmailValidatorAdapter with correct password", async () => {
      const { sut, emailValidatorStub } = makeSut();
      const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@email.com",
          password: "valid_password",
          passwordConfirmation: "valid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      await sut.handle(httpRequest);
      expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
    });

    test("should return 400 if provided email does not meet the requirements", async () => {
      const { sut, emailValidatorStub } = makeSut();
      jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "invalid@mail.com",
          password: "valid_password",
          passwordConfirmation: "valid_password",
          country: "valid_country",
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response.body).toEqual(new InvalidParamError("email"));
    });
  });
});
