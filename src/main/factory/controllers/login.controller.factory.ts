import { LoginController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

import { makeDbAuthentication } from "../usecases/db.authentication.factory";
import { makeLoginValidation } from "./login.controller.validation.factory";

export const makeLoginController = (): IController => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication());
};
