import {
  ICheckTruckLicensePlateRepository,
  IAddTruckRepository,
} from "@/data/protocols";
import { DbAddTruck } from "@/data/usecases";
import { IAddTruck } from "@/domain/usecases";
import {
  AddTruckRepositorySpy,
  CheckTruckLicensePlateRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddTruck;
  checkTruckLicensePlateRepositorySpy: ICheckTruckLicensePlateRepository;
  addTruckRepositorySpy: IAddTruckRepository;
};

export function dbAddTruckSut(): Sut {
  const checkTruckLicensePlateRepositorySpy =
    new CheckTruckLicensePlateRepositorySpy();
  const addTruckRepositorySpy = new AddTruckRepositorySpy();
  const sut = new DbAddTruck(
    checkTruckLicensePlateRepositorySpy,
    addTruckRepositorySpy
  );
  return {
    sut,
    checkTruckLicensePlateRepositorySpy,
    addTruckRepositorySpy,
  };
}
