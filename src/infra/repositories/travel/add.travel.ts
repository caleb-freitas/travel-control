import { IAddTravelRepository } from "@/data/protocols";
import { Travel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class AddTravelRepository implements IAddTravelRepository {
  async add(travelData: Travel.Params): Promise<Travel.Model> {
    const travel = await prisma.travel.create({
      data: {
        ...travelData,
      },
    });
    return travel;
  }
}
