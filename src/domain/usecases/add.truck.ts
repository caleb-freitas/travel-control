export namespace Truck {
  export type Params = {
    license_plate: string;
    ton_capacity: number;
    brand: string;
    model: string;
  };

  export type Model = {
    id: string;
    company_id: string;
    license_plate: string;
    ton_capacity: number;
    brand: string;
    model: string;
  };
}

export interface IAddTruck {
  add(data: Truck.Params): Promise<Truck.Model>;
}
