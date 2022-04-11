import {
  IEncrypter,
  IHashComparer,
  ILoadCompanyByEmailRepository,
} from "@/data/protocols";
import { IUpdateCompanyTokenRepository } from "@/data/protocols/database";
import { DbCompanyAuthentication } from "@/data/usecases";
import {
  EncrypterSpy,
  HashComparerSpy,
  LoadCompanyByEmailRepositorySpy,
  UpdateCompanyTokenRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: DbCompanyAuthentication;
  loadCompanyByEmailRepositorySpy: ILoadCompanyByEmailRepository;
  hashComparerSpy: IHashComparer;
  encrypterSpy: IEncrypter;
  updateCompanyTokenRepositorySpy: IUpdateCompanyTokenRepository;
};

export function companyAuthSut(): Sut {
  const loadCompanyByEmailRepositorySpy = new LoadCompanyByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateCompanyTokenRepositorySpy = new UpdateCompanyTokenRepositorySpy();
  const sut = new DbCompanyAuthentication(
    loadCompanyByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateCompanyTokenRepositorySpy
  );
  return {
    sut,
    loadCompanyByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateCompanyTokenRepositorySpy,
  };
}
