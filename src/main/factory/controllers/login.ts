import { makeDbAuthentication } from "@/main/factory/usecases";
import { makeLoginValidation } from "@/main/factory/validations";
import { LoginController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeLoginController(): IController {
  return new LoginController(makeLoginValidation(), makeDbAuthentication());
}
