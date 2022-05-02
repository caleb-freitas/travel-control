import { DbFinishTravel } from "@/data/usecases";
import {
  CheckTravelByIdRepository,
  FinishTravelRepository,
} from "@/infra/repositories";

export function makeDbFinishTravel(): DbFinishTravel {
  const checkTravelByIdRepository = new CheckTravelByIdRepository();
  const finishTravelRepository = new FinishTravelRepository();
  return new DbFinishTravel(checkTravelByIdRepository, finishTravelRepository);
}
