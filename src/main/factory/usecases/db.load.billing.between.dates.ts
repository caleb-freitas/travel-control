import { DbLoadBillingBetweenDates } from "@/data/usecases";
import { ILoadBillingBetweenDates } from "@/domain/usecases";
import { LoadBillingBetweenDatesRepository } from "@/infra/repositories/reports/load.billing.between.dates";

export function makeDbLoadBillingBetweenDates(): ILoadBillingBetweenDates {
  const loadBillingBetweenDatesRepository =
    new LoadBillingBetweenDatesRepository();
  return new DbLoadBillingBetweenDates(loadBillingBetweenDatesRepository);
}
