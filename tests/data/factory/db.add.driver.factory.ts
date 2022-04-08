import {
  IAddDriverRepository,
  ICheckCompanyIdRepository,
  ICheckDriverByEmailRepository,
  IHasher,
} from "@/data/protocols";
import { DbAddDriver } from "@/data/usecases";
import { IAddDriver } from "@/domain/usecases";
import {
  AddDriverRepositorySpy,
  CheckDriverEmailRepositorySpy,
  CheckCompanyIdRepositorySpy,
  HasherSpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddDriver;
  hasherSpy: IHasher;
  addDriverRepositorySpy: IAddDriverRepository;
  checkDriverByEmailRepositorySpy: ICheckDriverByEmailRepository;
  checkCompanyByIdRepositorySpy: ICheckCompanyIdRepository;
};

export function dbAddDriverSut(): Sut {
  const hasherSpy = new HasherSpy();
  const addDriverRepositorySpy = new AddDriverRepositorySpy();
  const checkDriverByEmailRepositorySpy = new CheckDriverEmailRepositorySpy();
  const checkCompanyByIdRepositorySpy = new CheckCompanyIdRepositorySpy();
  const sut = new DbAddDriver(
    hasherSpy,
    addDriverRepositorySpy,
    checkDriverByEmailRepositorySpy,
    checkCompanyByIdRepositorySpy
  );
  return {
    sut,
    hasherSpy,
    addDriverRepositorySpy,
    checkDriverByEmailRepositorySpy,
    checkCompanyByIdRepositorySpy,
  };
}
