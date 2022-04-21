import { IFinishTravel, Travel } from "@/domain/usecases";

import { ICheckTravelByIdRepository } from "../protocols";
import { IFinishTravelRepository } from "../protocols/database/travel/finish.travel";

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
