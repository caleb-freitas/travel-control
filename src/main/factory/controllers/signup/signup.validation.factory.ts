import { EmailValidatorAdapter } from "../../../../infra/validators/email.validator.adapter";
import { IValidation } from "../../../../presentation/protocols/validation";
import { CompareFieldsValidation } from "../../../../validation/validators/compare.passwords.validation";
import { EmailValidation } from "../../../../validation/validators/email.validation";
import { RequiredFieldValidation } from "../../../../validation/validators/required.fields.validation";
import { ValidationComposite } from "../../../../validation/validators/validation.composite";

export const makeSignUpValidation = (): ValidationComposite => {
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

  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
