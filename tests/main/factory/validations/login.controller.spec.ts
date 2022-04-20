import { makeLoginValidation } from "@/main/factory/validations";
import {
  IEmailValidator,
  IPasswordValidator,
  IValidation,
} from "@/presentation/protocols";
import {
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  RoleValidation,
  ValidationComposite,
} from "@/validation";

jest.mock("../../../../src/validation/validation.composite.ts");

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

describe("LoginValidationFactory", () => {
  test("should call validation composite with all validations", () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    const requiredFields: string[] = ["email", "password", "role"];
    const roleOptions = ["company", "driver"];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new PasswordValidation("password", makePasswordValidator())
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    validations.push(new RoleValidation("role", roleOptions));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
