import { makeDbAddTruck } from "@/main/factory/usecases";
import { makeAddTruckValidation } from "@/main/factory/validations";
import { AddTruckController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeAddTruckController(): IController {
  return new AddTruckController(makeDbAddTruck(), makeAddTruckValidation());
}
