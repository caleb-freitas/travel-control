import {
  ICheckTravelByIdRepository,
  IFinishTravelRepository,
} from "@/data/protocols";
import { Travel } from "@/domain/models";
import { IFinishTravel } from "@/domain/usecases";

export class DbFinishTravel implements IFinishTravel {
  constructor(
    private readonly checkTravelId: ICheckTravelByIdRepository,
    private readonly finishTravel: IFinishTravelRepository
  ) {}

  async finish(id: string): Promise<Travel.Params> {
    const travelExists = this.checkTravelId.check(id);
    if (!travelExists) return null;
    const updatedTravel = await this.finishTravel.finish(id);
    return updatedTravel;
  }
}
