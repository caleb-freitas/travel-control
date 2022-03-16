import { DriverSignUpController } from "../../../../src/presentation/controllers/signup/driver.signup.controller";
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
});
