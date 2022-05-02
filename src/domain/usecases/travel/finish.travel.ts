import { Travel } from "@/domain/models";

export interface IFinishTravel {
  finish(id: string): Promise<Travel.Params>;
}
