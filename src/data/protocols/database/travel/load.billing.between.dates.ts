import { Billing } from "@/domain/usecases";

export interface ILoadBillingBetweenDatesRepository {
  load(startDate: string, endDate: string): Promise<Billing.Model[]>;
}
