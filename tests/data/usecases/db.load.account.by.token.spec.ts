import { IDecrypter, ILoadAccountByTokenRepository } from "@/data/protocols";
import { DbLoadAccountByToken } from "@/data/usecases";
import {
  DecrypterSpy,
  LoadAccountByTokenRepositorySpy,
} from "@/tests/data/mocks";
import { throwError } from "@/tests/domain/mocks";

type Sut = {
  sut: DbLoadAccountByToken;
  decrypterSpy: IDecrypter;
  loadAccountByTokenRepositorySpy: ILoadAccountByTokenRepository;
};

function makeSut(): Sut {
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

describe("DbLoadAccountByToken", () => {
  test("should call Decrypter with correct values", async () => {
    const { sut, decrypterSpy } = makeSut();
    const decryptSpy = jest.spyOn(decrypterSpy, "decrypt");
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if Decrypter throw", async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });
});
