import {
  IAddDriverRepository,
  ICheckCompanyByIdRepository,
  ICheckDriverByEmailRepository,
  IHasher,
} from "@/data/protocols";
import { DbAddDriver } from "@/data/usecases";
import { IAddDriver } from "@/domain/usecases";
import {
  AddDriverRepositorySpy,
  CheckDriverEmailRepositorySpy,
  CheckCompanyByIdRepositorySpy,
  HasherSpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddDriver;
  hasherSpy: IHasher;
  addAddDriverRepositorySpy: IAddDriverRepository;
  checkDriverByEmailRepositorySpy: ICheckDriverByEmailRepository;
  checkCompanyByIdRepositorySpy: ICheckCompanyByIdRepository;
};

export function dbAddDriverSut(): Sut {
  const hasherSpy = new HasherSpy();
  const addAddDriverRepositorySpy = new AddDriverRepositorySpy();
  const checkDriverByEmailRepositorySpy = new CheckDriverEmailRepositorySpy();
  const checkCompanyByIdRepositorySpy = new CheckCompanyByIdRepositorySpy();
  const sut = new DbAddDriver(
    hasherSpy,
    addAddDriverRepositorySpy,
    checkDriverByEmailRepositorySpy,
    checkCompanyByIdRepositorySpy
  );
  return {
    sut,
    hasherSpy,
    addAddDriverRepositorySpy,
    checkDriverByEmailRepositorySpy,
    checkCompanyByIdRepositorySpy,
  };
}
