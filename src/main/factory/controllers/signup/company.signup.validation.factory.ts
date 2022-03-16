import { CnpjValidatorAdapter } from "../../../../infra/validators/cnpj.validator.adapter";
import { EmailValidatorAdapter } from "../../../../infra/validators/email.validator.adapter";
import { PasswordValidatorAdapter } from "../../../../infra/validators/password.validator.adapter";
import { IValidation } from "../../../../presentation/protocols/validation";
import {
  CnpjValidation,
  PasswordValidation,
} from "../../../../validation/validators";
import { CompareFieldsValidation } from "../../../../validation/validators/compare.passwords.validation";
import { EmailValidation } from "../../../../validation/validators/email.validation";
import { RequiredFieldValidation } from "../../../../validation/validators/required.fields.validation";
import { ValidationComposite } from "../../../../validation/validators/validation.composite";

export const makeCompanySignUpValidation = (): ValidationComposite => {
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
    new PasswordValidation("password", new PasswordValidatorAdapter())
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  validations.push(new CnpjValidation("cnpj", new CnpjValidatorAdapter()));
  return new ValidationComposite(validations);
};
