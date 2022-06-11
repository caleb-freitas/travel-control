import { ILoadDriversRepository } from "@/data/protocols/database";
import { Driver } from "@/domain/models";
import { ILoadDrivers } from "@/domain/usecases/driver/load.drivers";

export class DbLoadDrivers implements ILoadDrivers {
  constructor(private readonly loadDriversRepository: ILoadDriversRepository) { }

  async load(): Promise<Driver.Model[]> {
    return await this.loadDriversRepository.load()
  }
}
