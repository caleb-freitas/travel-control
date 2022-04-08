import {
  IAddCompanyRepository,
  ICheckCompanyByCnpjRepository,
  ICheckCompanyByEmailRepository,
  IHasher,
} from "@/data/protocols";
import { DbAddCompany } from "@/data/usecases";
import {
  AddAccountRepositorySpy,
  CheckCompanyByCnpjRepositorySpy,
  CheckCompanyByEmailRepositorySpy,
  HasherSpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: DbAddCompany;
  hasherSpy: IHasher;
  addAccountRepositorySpy: IAddCompanyRepository;
  checkCompanyByEmailRepositorySpy: ICheckCompanyByEmailRepository;
  checkCompanyByCnpjRepositorySpy: ICheckCompanyByCnpjRepository;
};

export function dbAddCompanySut(): Sut {
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const checkCompanyByEmailRepositorySpy =
    new CheckCompanyByEmailRepositorySpy();
  const checkCompanyByCnpjRepositorySpy = new CheckCompanyByCnpjRepositorySpy();
  const sut = new DbAddCompany(
    hasherSpy,
    addAccountRepositorySpy,
    checkCompanyByEmailRepositorySpy,
    checkCompanyByCnpjRepositorySpy
  );
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkCompanyByEmailRepositorySpy,
    checkCompanyByCnpjRepositorySpy,
  };
}
