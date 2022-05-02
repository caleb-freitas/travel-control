export namespace Billing {
  export type Params = {
    startDate: string;
    endDate: string;
    companyId: string;
  };
  export type Model = {
    id: string;
    driver_id: string;
    truck_id: string;
    client: string;
    created_at: Date;
    freight_value: number;
  };
}

export interface ILoadBillingBetweenDates {
  load(params: Billing.Params): Promise<Billing.Model[]>;
}
