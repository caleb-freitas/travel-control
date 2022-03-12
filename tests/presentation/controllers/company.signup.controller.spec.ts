import { IAccountModel } from "../../../src/domain/models/account.model";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../../src/domain/usecases/add.account";
import { CompanySignUpController } from "../../../src/presentation/controllers/company.signup.controller";
import {
  FieldInUseError,
  MissingParamError,
} from "../../../src/presentation/errors";
import { ServerError } from "../../../src/presentation/errors/server.error";
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from "../../../src/presentation/helpers/http.helper";
import { IHttpRequest } from "../../../src/presentation/protocols";
import { IValidation } from "../../../src/presentation/protocols/validation";

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

function makeValidation(): IValidation {
  class Validation implements IValidation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new Validation();
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
  addAccountStub: IAddAccount;
  validationStub: IValidation;
}

function makeSut(): ISutTypes {
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new CompanySignUpController(addAccountStub, validationStub);
  return {
    sut,
    addAccountStub,
    validationStub,
  };
}

describe("CompanySignUpController", () => {
  test("should call AddAccount with correct values", async () => {
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

  test("should return 500 if AddAccount throw", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => rejects(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError("email")));
  });

  test("should return 403 if AddAccount return an false", async () => {
    const { sut, addAccountStub } = makeSut();
    jest
      .spyOn(addAccountStub, "add")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(forbidden(new FieldInUseError()));
  });

  test("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    await sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError("email")));
  });

  test("should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new MissingParamError("any_field")));
  });

  test("should return 200 in success", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(ok(makeFakeAccount()));
  });
});