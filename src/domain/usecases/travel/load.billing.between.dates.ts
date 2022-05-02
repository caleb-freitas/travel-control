export namespace Billing {
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
  load(startDate: string, endDate: string): Promise<Billing.Model[]>;
}
