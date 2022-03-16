import { CompanySignUpController } from "../../../../presentation/controllers/signup/company.signup.controller";
import { IController } from "../../../../presentation/protocols";
import { makeDbAddCompany } from "../../usecases/db.add.company.factory";
import { makeCompanySignUpValidation } from "./company.signup.validation.factory";

export const makeCompanySignUpController = (): IController => {
  return new CompanySignUpController(
    makeDbAddCompany(),
    makeCompanySignUpValidation()
  );
};
