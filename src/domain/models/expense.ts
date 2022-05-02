export namespace Expense {
  export type Params = {
    travel_id: string;
    label: string;
    description: string;
    value: number;
    payment_method: string;
  };

  export type Model = {
    id: string;
    travel_id: string;
    label: string;
    description: string;
    value: number;
    payment_method: string;
    created_at: Date;
  };
}
