import { Travel } from "@/domain/usecases";

export interface IAddTravelRepository {
  add(traveData: Travel.Params): Promise<Travel.Model>;
}
