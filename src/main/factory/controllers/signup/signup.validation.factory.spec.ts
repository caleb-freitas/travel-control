import { IEmailValidator } from "../../../../presentation/protocols";
import { IValidation } from "../../../../presentation/protocols/validation";
import { CompareFieldsValidation } from "../../../../validation/validators/compare.passwords.validation";
import { EmailValidation } from "../../../../validation/validators/email.validation";
import { RequiredFieldValidation } from "../../../../validation/validators/required.fields.validation";
import { ValidationComposite } from "../../../../validation/validators/validation.composite";
import { makeSignUpValidation } from "./signup.validation.factory";

// remove the module's default behavior
jest.mock("../../../../validation/validators/validation.composite.ts");

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SignUp Validation Factory", () => {
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
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
