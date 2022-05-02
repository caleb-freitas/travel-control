import { makeDbLoadOpenTravels } from "@/main/factory/usecases";
import { LoadOpenTravelsController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeLoadOpenTravelsController(): IController {
  return new LoadOpenTravelsController(makeDbLoadOpenTravels());
}
