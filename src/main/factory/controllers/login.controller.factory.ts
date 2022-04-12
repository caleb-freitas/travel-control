import { LoginController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

import { makeDbAuthentication } from "../usecases/db.authentication.factory";
import { makeLoginValidation } from "../validations/login.controller";

export const makeLoginController = (): IController => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication());
};
