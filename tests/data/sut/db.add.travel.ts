import {
  IAddTravelRepository,
  ICheckCompanyByIdRepository,
  ICheckDriverByIdRepository,
  ICheckTruckByIdRepository,
} from "@/data/protocols";
import { DbAddTravel } from "@/data/usecases";
import { IAddTravel, IAddTruck } from "@/domain/usecases";
import {
  AddTravelRepositorySpy,
  CheckCompanyByIdRepositorySpy,
  CheckDriverByIdRepositorySpy,
  CheckTruckByIdRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddTravel;
  addTravelSpy: IAddTravelRepository;
  checkCompanyByIdRepositorySpy: ICheckCompanyByIdRepository;
  checkDriverByIdRepositorySpy: ICheckDriverByIdRepository;
  checkTruckByIdRepositorySpy: ICheckTruckByIdRepository;
};

export function dbAddTravelSut(): Sut {
  const addTravelSpy = new AddTravelRepositorySpy();
  const checkCompanyByIdRepositorySpy = new CheckCompanyByIdRepositorySpy();
  const checkDriverByIdRepositorySpy = new CheckDriverByIdRepositorySpy();
  const checkTruckByIdRepositorySpy = new CheckTruckByIdRepositorySpy();
  const sut = new DbAddTravel(
    addTravelSpy,
    checkCompanyByIdRepositorySpy,
    checkDriverByIdRepositorySpy,
    checkTruckByIdRepositorySpy
  );
  return {
    sut,
    addTravelSpy,
    checkCompanyByIdRepositorySpy,
    checkDriverByIdRepositorySpy,
    checkTruckByIdRepositorySpy,
  };
}
