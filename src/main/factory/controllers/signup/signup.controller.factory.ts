import { CnpjValidatorAdapter } from "../../../../infra/validators/cnpj.validator.adapter";
import { EmailValidatorAdapter } from "../../../../infra/validators/email.validator.adapter";
import { PasswordValidatorAdapter } from "../../../../infra/validators/password.validator.adapter";
import { CompanySignUpController } from "../../../../presentation/controllers/company.signup.controller";
import { IController } from "../../../../presentation/protocols";
import {} from "./signup.validation.factory";

export const makeSignUpController = (): IController => {
  return new CompanySignUpController(
    new PasswordValidatorAdapter(),
    new EmailValidatorAdapter(),
    new CnpjValidatorAdapter()
  );
};
