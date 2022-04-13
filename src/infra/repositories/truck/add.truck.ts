import { IAddTruckRepository } from "@/data/protocols/database/truck";
import { Truck } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class AddTruckRepository implements IAddTruckRepository {
  async add(truckData: Truck.Params): Promise<Truck.Model> {
    const truck = await prisma.truck.create({
      data: {
        ...truckData,
      },
    });
    return truck;
  }
}
