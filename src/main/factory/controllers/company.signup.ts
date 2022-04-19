import { makeDbAddCompany } from "@/main/factory/usecases";
import { makeCompanySignUpValidation } from "@/main/factory/validations";
import { CompanySignUpController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeCompanySignUpController(): IController {
  return new CompanySignUpController(
    makeDbAddCompany(),
    makeCompanySignUpValidation()
  );
}
