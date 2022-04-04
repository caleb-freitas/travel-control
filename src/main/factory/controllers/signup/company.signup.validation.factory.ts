import {
  CnpjValidatorAdapter,
  EmailValidatorAdapter,
  PasswordValidatorAdapter,
} from "@/infra/validators";
import { IValidation } from "@/presentation/protocols";
import {
  CnpjValidation,
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation";

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
