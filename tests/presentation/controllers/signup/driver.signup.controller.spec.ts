import { IDriverModel } from "../../../../src/domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../../src/domain/usecases/add.driver";
import { DriverSignUpController } from "../../../../src/presentation/controllers/signup/driver.signup.controller";
import {
  FieldInUseError,
  MissingParamError,
  ServerError,
} from "../../../../src/presentation/errors";
import {
  badRequest,
  forbidden,
  serverError,
  ok,
} from "../../../../src/presentation/helpers/http.helper";
import {
  IController,
  IHttpRequest,
} from "../../../../src/presentation/protocols";
import { IValidation } from "../../../../src/presentation/protocols/validation";

function makeFakeRequest(): IHttpRequest {
  return {
    body: {
      company_id: "company_id",
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
      passwordConfirmation: "any_password",
      drivers_license: "any_driver_license",
      created_at: "any_date",
    },
  };
}

function makeFakeAccount(): IDriverModel {
  return {
    id: "valid_id",
    company_id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "valid_password",
    drivers_license: "drivers_license",
    created_at: new Date("1995-12-17T03:24:00"),
  };
}

function makeValidation(): IValidation {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
}

function makeAddDriver(): IAddDriver {
  class AddDriverStub implements IAddDriver {
    async add(account: IAddDriverModel): Promise<IDriverModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddDriverStub();
}

interface ISutTypes {
  sut: IController;
  validationStub: IValidation;
  addDriverStub: IAddDriver;
}

function makeSut(): ISutTypes {
  const validationStub = makeValidation();
  const addDriverStub = makeAddDriver();
  const sut = new DriverSignUpController(addDriverStub, validationStub);
  return {
    sut,
    validationStub,
    addDriverStub,
  };
}

describe("DriverSignUpController", () => {
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
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 400 if Validation return an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new MissingParamError("field")));
  });

  test("should call AddDriver with correct values", async () => {
    const { sut, addDriverStub } = makeSut();
    const addSpy = jest.spyOn(addDriverStub, "add");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      company_id: "company_id",
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
      drivers_license: "any_driver_license",
    });
  });

  test("should return 500 if AddDriver throw", async () => {
    const { sut, addDriverStub } = makeSut();
    jest.spyOn(addDriverStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return an account on success", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(ok(makeFakeAccount()));
  });
});
