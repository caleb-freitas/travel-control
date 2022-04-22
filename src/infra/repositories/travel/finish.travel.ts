import { IFinishTravelRepository } from "@/data/protocols/database/travel/finish.travel";
import { Travel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class FinishTravelRepository implements IFinishTravelRepository {
  async finish(id: string): Promise<Travel.Params> {
    const updatedTravel = await prisma.travel.update({
      where: {
        id,
      },
      data: {
        delivered_in: new Date(),
      },
    });
    return updatedTravel;
  }
}
