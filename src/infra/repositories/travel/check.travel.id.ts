import { ICheckTravelByIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckTravelByIdRepository implements ICheckTravelByIdRepository {
  async check(id: string): Promise<boolean> {
    const travelExists = await prisma.travel.findFirst({
      where: {
        id,
      },
    });
    return !!travelExists;
  }
}
