import { DbAddTruck } from "@/data/usecases";
import { IAddTruck } from "@/domain/usecases";
import {
  AddTruckRepository,
  CheckCompanyByIdRepository,
  CheckTruckByLicensePlateRepository,
} from "@/infra/repositories";

export function makeDbAddTruck(): IAddTruck {
  const checkTruckByLicensePlateRepository =
    new CheckTruckByLicensePlateRepository();
  const checkCompanyIdRepository = new CheckCompanyByIdRepository();
  const addTruckRepository = new AddTruckRepository();
  return new DbAddTruck(
    checkTruckByLicensePlateRepository,
    checkCompanyIdRepository,
    addTruckRepository
  );
}
