import { ILoadDriversRepository } from "@/data/protocols/database";
import { Driver } from "@/domain/models";
import { prisma } from "@/infra/repositories";

export class LoadDriversRepository implements ILoadDriversRepository {
  async load(): Promise<Driver.Model[]> {
    return await prisma.driver.findMany()
  }
}
