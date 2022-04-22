import { Travel } from "@/domain/usecases";

export interface IFinishTravel {
  finish(id: string): Promise<Travel.Params>;
}
