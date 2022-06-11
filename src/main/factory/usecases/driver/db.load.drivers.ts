import { DbLoadDrivers } from "@/data/usecases";
import { ILoadDrivers } from "@/domain/usecases";
import { LoadDriversRepository } from "@/infra/repositories";

export function makeDbLoadDrivers(): ILoadDrivers {
  const loadDriversRepository = new LoadDriversRepository()
  return new DbLoadDrivers(loadDriversRepository)
}