import { makeDbLoadExpenseByTravel } from "@/main/factory/usecases";
import { LoadExpensesByTravelController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeLoadExpensesByTravelController(): IController {
  return new LoadExpensesByTravelController(makeDbLoadExpenseByTravel());
}
