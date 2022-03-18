import { EmailValidatorAdapter } from "../../../../infra/validators/email.validator.adapter";
import { PasswordValidatorAdapter } from "../../../../infra/validators/password.validator.adapter";
import { IValidation } from "../../../../presentation/protocols/validation";
import {
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../validation/validators";

export function makeDriverSignUpValidation(): ValidationComposite {
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
    new PasswordValidation("password", new PasswordValidatorAdapter())
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
}
