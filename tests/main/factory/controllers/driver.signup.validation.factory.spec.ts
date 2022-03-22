import { makeDriverSignUpValidation } from "@/main/factory";
import {
  IEmailValidator,
  IPasswordValidator,
  IValidation,
} from "@/presentation/protocols";
import {
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

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
      "company_id",
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
