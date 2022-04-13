import { makeDbAddTravel } from "@/main/factory/usecases";
import { makeAddTravelValidation } from "@/main/factory/validations";
import { AddTravelController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export const makeAddTravelController = (): IController => {
  return new AddTravelController(makeAddTravelValidation(), makeDbAddTravel());
};
