export namespace Truck {
  export type Params = {
    company_id: string;
    license_plate: string;
    ton_capacity: number;
    brand: string;
    model: string;
  };

  export type TruckModel = {
    id: string;
    company_id: string;
    license_plate: string;
    ton_capacity: number;
    brand: string;
    model: string;
    created_at: Date;
  };
  export type Model = TruckModel | Error;
}
