import { DriverSignUpController } from "../../../../src/presentation/controllers/signup/driver.signup.controller";
import { IValidation } from "../../../../src/presentation/protocols/validation";

function makeValidation(): IValidation {
  class ValidationStub implements IValidation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
}

const validationStub = makeValidation();

describe("DriverSignUpController", () => {
  test("should call Validation with correct values", async () => {
    const sut = new DriverSignUpController(validationStub);
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = {
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
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
