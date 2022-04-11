import {
  IEncrypter,
  IHashComparer,
  ILoadDriverByEmailRepository,
} from "@/data/protocols";
import { IUpdateDriverTokenRepository } from "@/data/protocols/database";
import { DbDriverAuthentication } from "@/data/usecases";
import {
  EncrypterSpy,
  HashComparerSpy,
  LoadDriverByEmailRepositorySpy,
  UpdateDriverTokenRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: DbDriverAuthentication;
  loadDriverByEmailRepositorySpy: ILoadDriverByEmailRepository;
  hashComparerSpy: IHashComparer;
  encrypterSpy: IEncrypter;
  updateDriverTokenRepositorySpy: IUpdateDriverTokenRepository;
};

export function driverAuthSut(): Sut {
  const loadDriverByEmailRepositorySpy = new LoadDriverByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateDriverTokenRepositorySpy = new UpdateDriverTokenRepositorySpy();
  const sut = new DbDriverAuthentication(
    loadDriverByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateDriverTokenRepositorySpy
  );
  return {
    sut,
    loadDriverByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateDriverTokenRepositorySpy,
  };
}
