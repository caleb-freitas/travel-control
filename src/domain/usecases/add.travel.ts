export namespace Travel {
  export type Params = {
    driver_id: string;
    company_id: string;
    truck_id: string;
    client: string;
    departure_city: string;
    departure_state: string;
    destination_city: string;
    destination_state: string;
    product: string;
    freight_value: number;
    delivered_in?: Date;
  };

  export type TravelModel = {
    id: string;
    driver_id: string;
    company_id: string;
    truck_id: string;
    client: string;
    departure_city: string;
    departure_state: string;
    destination_city: string;
    destination_state: string;
    product: string;
    freight_value: number;
    created_at: Date;
    delivered_in: Date;
  };

  export type Model = TravelModel | Error;
}

export interface IAddTravel {
  add(travelData: Travel.Params): Promise<Travel.Model>;
}
