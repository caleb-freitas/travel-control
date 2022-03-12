import { CnpjValidatorAdapter } from "../../../../infra/validators/cnpj.validator.adapter";
import {
  IEmailValidator,
  IPasswordValidator,
} from "../../../../presentation/protocols";
import { IValidation } from "../../../../presentation/protocols/validation";
import {
  CnpjValidation,
  PasswordValidation,
} from "../../../../validation/validators";
import { CompareFieldsValidation } from "../../../../validation/validators/compare.passwords.validation";
import { EmailValidation } from "../../../../validation/validators/email.validation";
import { RequiredFieldValidation } from "../../../../validation/validators/required.fields.validation";
import { ValidationComposite } from "../../../../validation/validators/validation.composite";
import { makeSignUpValidation } from "./signup.validation.factory";

// remove the module's default behavior
jest.mock("../../../../validation/validators/validation.composite.ts");

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

describe("SignUpValidationFactory", () => {
  test("should call validation composite with all validation", () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
      "cnpj",
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
    validations.push(new CnpjValidation("cnpj", new CnpjValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
