import { makeDriverSignUpValidation } from "../../../../src/main/factory/controllers/signup/driver.signup.validation.factory";
import {
  IEmailValidator,
  IPasswordValidator,
} from "../../../../src/presentation/protocols";
import { IValidation } from "../../../../src/presentation/protocols/validation";
import {
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../src/validation/validators";

function makeEmailValidator(): IEmailValidator {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
}

function makePasswordValidator(): IPasswordValidator {
  class PasswordValidatorStub implements IPasswordValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new PasswordValidatorStub();
}

jest.mock("../../../../src/validation/validators/validation.composite.ts");

describe("DriverSignUpValidationFactory", () => {
  test("should call ValidationComposite with correct validations", () => {
    makeDriverSignUpValidation();
    const validations: IValidation[] = [];
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
      "drivers_license",
    ];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(
      new PasswordValidation("password", makePasswordValidator())
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
