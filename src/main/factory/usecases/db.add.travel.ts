import { DbAddTravel } from "@/data/usecases";
import { IAddTravel } from "@/domain/usecases";
import {
  AddTravelRepository,
  CheckCompanyByIdRepository,
  CheckDriverByIdRepository,
  CheckTruckByIdRepository,
} from "@/infra/repositories";

export function makeDbAddTravel(): IAddTravel {
  const checkTruckByIdRepository = new CheckTruckByIdRepository();
  const checkCompanyIdRepository = new CheckCompanyByIdRepository();
  const checkDriverByIdRepository = new CheckDriverByIdRepository();
  const addTravelRepository = new AddTravelRepository();
  return new DbAddTravel(
    addTravelRepository,
    checkCompanyIdRepository,
    checkTruckByIdRepository,
    checkDriverByIdRepository
  );
}
