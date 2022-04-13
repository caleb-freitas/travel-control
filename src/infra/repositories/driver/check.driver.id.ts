import { ICheckDriverByIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckDriverByIdRepository implements ICheckDriverByIdRepository {
  async check(id: string): Promise<boolean> {
    const driverExists = await prisma.driver.findFirst({
      where: {
        id,
      },
    });
    return !!driverExists;
  }
}
