import { DbLoadOpenTravels } from "@/data/usecases";
import { ILoadOpenTravels } from "@/domain/usecases";
import { LoadOpenTravelsRepository } from "@/infra/repositories";

export function makeDbLoadOpenTravels(): ILoadOpenTravels {
  const loadOpenTravelsRepository = new LoadOpenTravelsRepository();
  return new DbLoadOpenTravels(loadOpenTravelsRepository);
}
