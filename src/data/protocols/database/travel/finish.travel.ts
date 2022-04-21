import { Travel } from "@/domain/usecases";

export interface IFinishTravelRepository {
  finish(id: string): Promise<Travel.Params>;
}
