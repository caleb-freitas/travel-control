import { IDecrypter, ILoadAccountByTokenRepository } from "@/data/protocols";
import { DbLoadAccountByToken } from "@/data/usecases";
import {
  DecrypterSpy,
  LoadAccountByTokenRepositorySpy,
} from "@/tests/data/mocks";
import { throwError } from "@/tests/domain/mocks";
import { mockCompanyResult } from "@/tests/domain/mocks/mock.company";

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
  test("should call Decrypter with correct token", async () => {
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

  test("should call LoadAccountByTokenRepository with correct token", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositorySpy,
      "loadByToken"
    );
    await sut.load("any_token");
    expect(loadByTokenSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if LoadAccountByTokenRepository throw", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("should return null if token does not exist", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockImplementationOnce(null);
    const response = await sut.load("any_token");
    expect(response).toBeNull();
  });

  test("should return an account on success", async () => {
    const { sut } = makeSut();
    const account = await sut.load("any_token");
    expect(account).toEqual(mockCompanyResult());
  });
});
