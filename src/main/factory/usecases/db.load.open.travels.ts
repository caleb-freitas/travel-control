import { DbLoadOpenTravels } from "@/data/usecases";
import { ILoadOpenTravels } from "@/domain/usecases";
import { LoadOpenTravelsRepository } from "@/infra/repositories/travel/load.open.travels";

export function makeDbLoadOpenTravels(): ILoadOpenTravels {
  const loadOpenTravelsRepository = new LoadOpenTravelsRepository();
  return new DbLoadOpenTravels(loadOpenTravelsRepository);
}
