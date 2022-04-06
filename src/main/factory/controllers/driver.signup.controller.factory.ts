import { makeDbAddDriver, makeDriverSignUpValidation } from "@/main/factory";
import { DriverSignUpController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeDriverSignUpController(): IController {
  return new DriverSignUpController(
    makeDbAddDriver(),
    makeDriverSignUpValidation()
  );
}
