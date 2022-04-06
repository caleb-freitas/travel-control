import { EmailValidatorAdapter, PasswordValidatorAdapter } from "@/infra";
import { IValidation } from "@/presentation/protocols";
import {
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  RoleValidation,
  ValidationComposite,
} from "@/validation";

export function makeLoginValidation(): ValidationComposite {
  const validations: IValidation[] = [];
  const requiredFields: string[] = ["email", "password", "role"];
  const roleOptions = ["company", "driver"];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new PasswordValidation("password", new PasswordValidatorAdapter())
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  validations.push(new RoleValidation("role", roleOptions));
  return new ValidationComposite(validations);
}
