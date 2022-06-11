import { LoadDriversController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";
import { makeDbLoadDrivers } from "@/main/factory/usecases";

export function makeLoadDriversController(): IController {
  return new LoadDriversController(
    makeDbLoadDrivers()
  );
}
