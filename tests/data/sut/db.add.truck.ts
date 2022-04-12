import {
  ICheckTruckLicensePlateRepository,
  IAddTruckRepository,
  ICheckCompanyByIdRepository,
} from "@/data/protocols";
import { DbAddTruck } from "@/data/usecases";
import { IAddTruck } from "@/domain/usecases";
import {
  AddTruckRepositorySpy,
  CheckCompanyByIdRepositorySpy,
  CheckTruckLicensePlateRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddTruck;
  checkTruckLicensePlateRepositorySpy: ICheckTruckLicensePlateRepository;
  addTruckRepositorySpy: IAddTruckRepository;
  checkCompanyByIdRepositorySpy: ICheckCompanyByIdRepository;
};

export function dbAddTruckSut(): Sut {
  const checkTruckLicensePlateRepositorySpy =
    new CheckTruckLicensePlateRepositorySpy();
  const addTruckRepositorySpy = new AddTruckRepositorySpy();
  const checkCompanyByIdRepositorySpy = new CheckCompanyByIdRepositorySpy();
  const sut = new DbAddTruck(
    checkTruckLicensePlateRepositorySpy,
    checkCompanyByIdRepositorySpy,
    addTruckRepositorySpy
  );
  return {
    sut,
    checkTruckLicensePlateRepositorySpy,
    checkCompanyByIdRepositorySpy,
    addTruckRepositorySpy,
  };
}
