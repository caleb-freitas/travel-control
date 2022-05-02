import { ILoadBillingBetweenDatesRepository } from "@/data/protocols";
import { Billing, ILoadBillingBetweenDates } from "@/domain/usecases";

export class DbLoadBillingBetweenDates implements ILoadBillingBetweenDates {
  constructor(
    private readonly loadBillingRepository: ILoadBillingBetweenDatesRepository
  ) {}

  async load(params: Billing.Params): Promise<Billing.Model[]> {
    const { startDate, endDate, companyId } = params;
    const billing = await this.loadBillingRepository.load({
      startDate,
      endDate,
      companyId,
    });
    return billing;
  }
}
