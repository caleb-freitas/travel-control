import { ICheckTruckByIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckTruckByIdRepository implements ICheckTruckByIdRepository {
  async check(id: string): Promise<boolean> {
    const truckExists = await prisma.truck.findFirst({
      where: {
        id,
      },
    });
    return !!truckExists;
  }
}
