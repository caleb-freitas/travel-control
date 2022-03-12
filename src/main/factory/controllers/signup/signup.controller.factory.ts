import { CompanySignUpController } from "../../../../presentation/controllers/company.signup.controller";
import { IController } from "../../../../presentation/protocols";
import { makeDbAddAccount } from "../../add.account/db.add.account.factory";
import { makeSignUpValidation } from "./signup.validation.factory";

export const makeSignUpController = (): IController => {
  return new CompanySignUpController(
    makeDbAddAccount(),
    makeSignUpValidation()
  );
};
