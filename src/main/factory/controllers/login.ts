import { LoginController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

import { makeDbAuthentication } from "../usecases/db.authentication";
import { makeLoginValidation } from "../validations/login";

export const makeLoginController = (): IController => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication());
};
