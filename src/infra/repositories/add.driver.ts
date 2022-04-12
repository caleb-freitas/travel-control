import { IAddDriverRepository } from "@/data/protocols";
import { IDriverModel } from "@/domain/models";
import { IAddDriverModel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class AddDriverRepository implements IAddDriverRepository {
  async add(driverData: IAddDriverModel): Promise<IDriverModel> {
    const driver = await prisma.driver.create({
      data: {
        ...driverData,
      },
    });
    return driver;
  }
}
