import { makeDbAddDriver } from "@/main/factory/usecases";
import { makeDriverSignUpValidation } from "@/main/factory/validations";
import { DriverSignUpController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeDriverSignUpController(): IController {
  return new DriverSignUpController(
    makeDbAddDriver(),
    makeDriverSignUpValidation()
  );
}
