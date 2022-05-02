import { makeDbFinishTravel } from "@/main/factory/usecases";
import { FinishTravelController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeFinishTravelController(): IController {
  return new FinishTravelController(makeDbFinishTravel());
}
