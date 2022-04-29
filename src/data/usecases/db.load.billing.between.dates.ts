import { Billing, ILoadBillingBetweenDates } from "@/domain/usecases";

import { ILoadBillingBetweenDatesRepository } from "../protocols";

export class DbLoadBillingBetweenDates implements ILoadBillingBetweenDates {
  constructor(
    private readonly loadBillingRepository: ILoadBillingBetweenDatesRepository
  ) {}

  async load(startDate: string, endDate: string): Promise<Billing.Model[]> {
    const billing = await this.loadBillingRepository.load(startDate, endDate);
    return billing;
  }
}
