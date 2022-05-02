import { Billing } from "@/domain/usecases";

export interface ILoadBillingBetweenDatesRepository {
  load(params: Billing.Params): Promise<Billing.Model[]>;
}
