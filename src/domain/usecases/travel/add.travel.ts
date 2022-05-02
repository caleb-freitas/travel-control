import { Travel } from "@/domain/models";

export interface IAddTravel {
  add(travelData: Travel.Params): Promise<Travel.Model | Error>;
}
