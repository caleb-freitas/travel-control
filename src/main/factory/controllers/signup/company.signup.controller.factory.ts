import { makeCompanySignUpValidation, makeDbAddCompany } from "@/main/factory";
import { CompanySignUpController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export const makeCompanySignUpController = (): IController => {
  return new CompanySignUpController(
    makeDbAddCompany(),
    makeCompanySignUpValidation()
  );
};
