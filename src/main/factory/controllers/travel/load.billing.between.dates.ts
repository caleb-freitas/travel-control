import { makeDbLoadBillingBetweenDates } from "@/main/factory/usecases";
import { LoadBillingBetweenDatesController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeLoadBillingBetweenDatesController(): IController {
  return new LoadBillingBetweenDatesController(makeDbLoadBillingBetweenDates());
}
