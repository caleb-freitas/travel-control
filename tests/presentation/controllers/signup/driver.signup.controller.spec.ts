import { DriverSignUpController } from "../../../../src/presentation/controllers/signup/driver.signup.controller";
import {
  MissingParamError,
  ServerError,
} from "../../../../src/presentation/errors";
import {
  badRequest,
  serverError,
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
      driverLicense: "any_driver_license",
      created_at: "any_date",
    },
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

interface ISutTypes {
  sut: IController;
  validationStub: IValidation;
}

function makeSut(): ISutTypes {
  const validationStub = makeValidation();
  const sut = new DriverSignUpController(validationStub);
  return {
    sut,
    validationStub,
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
});
