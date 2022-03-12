import { IAccountModel } from "../../domain/models/account.model";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../domain/usecases/add.account";
import { InvalidParamError, MissingParamError } from "../errors";
import { ServerError } from "../errors/server.error";
import { badRequest, serverError } from "../helpers/http.helper";
import {
  IPasswordValidator,
  IEmailValidator,
  ICnpjValidator,
  IHttpRequest,
} from "../protocols";
import { CompanySignUpController } from "./company.signup.controller";

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

function makeCnpjValidator(): ICnpjValidator {
  class CnpjValidatorStub implements ICnpjValidator {
    isCnpj(cnpj: string): boolean {
      return true;
    }
  }
  return new CnpjValidatorStub();
}

function makeFakeAccount(): IAccountModel {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "valid_password",
    cnpj: "valid_cnpj",
    created_at: new Date("1995-12-17T03:24:00"),
  };
}

function makeAddAccount(): IAddAccount {
  class AddAccountStub implements IAddAccount {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountStub();
}
function makeFakeRequest(): IHttpRequest {
  return {
    body: {
      name: "any_name",
      email: "any@mail.com",
      password: "any_password",
      passwordConfirmation: "any_password",
      cnpj: "any_cnpj",
    },
  };
}

interface ISutTypes {
  sut: CompanySignUpController;
  passwordValidatorStub: IPasswordValidator;
  emailValidatorStub: IEmailValidator;
  cnpjValidatorStub: ICnpjValidator;
  addAccountStub: IAddAccount;
}

function makeSut(): ISutTypes {
  const passwordValidatorStub = makePasswordValidator();
  const emailValidatorStub = makeEmailValidator();
  const cnpjValidatorStub = makeCnpjValidator();
  const addAccountStub = makeAddAccount();
  const sut = new CompanySignUpController(
    passwordValidatorStub,
    emailValidatorStub,
    cnpjValidatorStub,
    addAccountStub
  );
  return {
    sut,
    passwordValidatorStub,
    emailValidatorStub,
    cnpjValidatorStub,
    addAccountStub,
  };
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
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(badRequest(new MissingParamError("email")));
    });

    test("should return 400 if no cnpj is provided", async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: "valid_name",
          email: "valid@mail.com",
          password: "valid_password",
          passwordConfirmation: "valid_password",
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
          cnpj: "valid_cnpj",
        },
      };
      const response = await sut.handle(httpRequest);
      expect(response).toEqual(
        badRequest(new InvalidParamError("passwordConfirmation"))
      );
    });

    test("should call PasswordValidator with correct password", async () => {
      const { sut, passwordValidatorStub } = makeSut();
      const isValidSpy = jest.spyOn(passwordValidatorStub, "isValid");
      await sut.handle(makeFakeRequest());
      expect(isValidSpy).toHaveBeenCalledWith(makeFakeRequest().body.password);
    });

    test("should return 400 if provided password does not meet the requirements", async () => {
      const { sut, passwordValidatorStub } = makeSut();
      jest.spyOn(passwordValidatorStub, "isValid").mockReturnValueOnce(false);
      const response = await sut.handle(makeFakeRequest());
      expect(response.body).toEqual(new InvalidParamError("password"));
    });

    test("should throw if PasswordValidator throws", async () => {
      const { sut, passwordValidatorStub } = makeSut();
      jest
        .spyOn(passwordValidatorStub, "isValid")
        .mockImplementationOnce(() => {
          throw new Error();
        });
      const response = await sut.handle(makeFakeRequest());
      expect(response).toEqual(serverError(new Error()));
    });
  });

  describe("Email validation", () => {
    test("should call EmailValidator with correct password", async () => {
      const { sut, emailValidatorStub } = makeSut();
      const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
      await sut.handle(makeFakeRequest());
      expect(isValidSpy).toHaveBeenCalledWith(makeFakeRequest().body.email);
    });

    test("should return 400 if provided email does not meet the requirements", async () => {
      const { sut, emailValidatorStub } = makeSut();
      jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
      const response = await sut.handle(makeFakeRequest());
      expect(response.body).toEqual(new InvalidParamError("email"));
    });

    test("should throw if EmailValidator throws", async () => {
      const { sut, emailValidatorStub } = makeSut();
      jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
        throw new Error();
      });
      const response = await sut.handle(makeFakeRequest());
      expect(response).toEqual(serverError(new Error()));
    });
  });

  describe("Cnpj validation", () => {
    test("should call CnpjValidator with correct cnpj", async () => {
      const { sut, cnpjValidatorStub } = makeSut();
      const isValidSpy = jest.spyOn(cnpjValidatorStub, "isCnpj");
      await sut.handle(makeFakeRequest());
      expect(isValidSpy).toHaveBeenCalledWith(makeFakeRequest().body.cnpj);
    });

    test("should return 400 if provided cnpj does not meet the requirements", async () => {
      const { sut, cnpjValidatorStub } = makeSut();
      jest.spyOn(cnpjValidatorStub, "isCnpj").mockReturnValueOnce(false);
      const response = await sut.handle(makeFakeRequest());
      expect(response.body).toEqual(new InvalidParamError("cnpj"));
    });

    test("should throw if CnpjValidator throws", async () => {
      const { sut, cnpjValidatorStub } = makeSut();
      jest.spyOn(cnpjValidatorStub, "isCnpj").mockImplementationOnce(() => {
        throw new Error();
      });
      const response = await sut.handle(makeFakeRequest());
      expect(response).toEqual(serverError(new Error()));
    });
  });

  describe("AddAccount", () => {
    test("should call add account with correct values", async () => {
      const { sut, addAccountStub } = makeSut();
      const addSpy = jest.spyOn(addAccountStub, "add");
      await sut.handle(makeFakeRequest());
      expect(addSpy).toHaveBeenCalledWith({
        name: "any_name",
        email: "any@mail.com",
        password: "any_password",
        cnpj: "any_cnpj",
      });
    });
  });

  test("should return 500 if AddAccount throw", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => rejects(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError("email")));
  });
});

describe("Success", () => {
  // test("should return 200 in success", async () => {
  //   const { sut } = makeSut();
  //   const response = await sut.handle(makeFakeRequest());
  //   expect(response.statusCode).toBe(200);
  // });
});
