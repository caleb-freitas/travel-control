import { DriverSignUpController } from "../../../../presentation/controllers/signup/driver.signup.controller";
import { IController } from "../../../../presentation/protocols";
import { makeDbAddDriver } from "../../usecases/db.add.driver.factory";
import { makeDriverSignUpValidation } from "./driver.signup.validation.factory";

export function makeDriverSignUpController(): IController {
  return new DriverSignUpController(
    makeDbAddDriver(),
    makeDriverSignUpValidation()
  );
}
