import { CnpjValidatorAdapter } from "../../../../src/infra/validators/cnpj.validator.adapter";
import { makeCompanySignUpValidation } from "../../../../src/main/factory/controllers/signup/company.signup.validation.factory";
import {
  IEmailValidator,
  IPasswordValidator,
} from "../../../../src/presentation/protocols";
import { IValidation } from "../../../../src/presentation/protocols/validation";
import {
  RequiredFieldValidation,
  CompareFieldsValidation,
  PasswordValidation,
  EmailValidation,
  CnpjValidation,
  ValidationComposite,
} from "../../../../src/validation/validators";

// remove the module's default behavior
jest.mock("../../../../src/validation/validators/validation.composite.ts");

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
    makeCompanySignUpValidation();
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
