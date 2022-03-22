import { CnpjValidatorAdapter } from "@/infra/validators";
import { makeCompanySignUpValidation } from "@/main/factory";
import {
  IEmailValidator,
  IPasswordValidator,
  IValidation,
} from "@/presentation/protocols";
import {
  CnpjValidation,
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

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
