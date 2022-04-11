import { IDecrypter, ILoadAccountByTokenRepository } from "@/data/protocols";
import { DbLoadAccountByToken } from "@/data/usecases";
import {
  DecrypterSpy,
  LoadAccountByTokenRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: DbLoadAccountByToken;
  decrypterSpy: IDecrypter;
  loadAccountByTokenRepositorySpy: ILoadAccountByTokenRepository;
};

export function loadAccountTokenSut(): Sut {
  const decrypterSpy = new DecrypterSpy();
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy();
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  );
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
  };
}
