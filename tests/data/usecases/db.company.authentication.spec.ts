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
import {
  mockCompanyAuthenticationParams,
  throwError,
} from "@/tests/domain/mocks";

type Sut = {
  sut: DbCompanyAuthentication;
  loadCompanyByEmailRepositorySpy: ILoadCompanyByEmailRepository;
  hashComparerSpy: IHashComparer;
  encrypterSpy: IEncrypter;
  updateCompanyTokenRepositorySpy: IUpdateCompanyTokenRepository;
};

function makeSut(): Sut {
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

describe("DbCompanyAuthentication", () => {
  test("should call LoadCompanyByEmailRepository with correct email", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  test("should throw if LoadCompanyByEmailRepository throw", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if LoadCompanyByEmailRepository return null", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail")
      .mockReturnValueOnce(null);
    const authenticationParams = mockCompanyAuthenticationParams();
    const response = await sut.auth(authenticationParams);
    expect(response).toBe(null);
  });

  test("should call HashComparer with correct password", async () => {
    const { sut, hashComparerSpy } = makeSut();
    const compareSpy = jest.spyOn(hashComparerSpy, "compare");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(compareSpy).toHaveBeenCalledWith("password", "hashed_password");
  });

  test("should throw if HashComparer throw", async () => {
    const { sut, hashComparerSpy } = makeSut();
    jest.spyOn(hashComparerSpy, "compare").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call Encrypter with correct plaintext", async () => {
    const { sut, encrypterSpy } = makeSut();
    const encryptSpy = jest.spyOn(encrypterSpy, "encrypt");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(encryptSpy).toHaveBeenCalledWith("company_id");
  });

  test("should throw if Encrypter throw", async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return correct data on success", async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call UpdateCompanyTokenRepository with correct values", async () => {
    const { sut, updateCompanyTokenRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(
      updateCompanyTokenRepositorySpy,
      "updateAccessToken"
    );
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith("company_id", "access_token");
  });

  test("should throw if UpdateCompanyTokenRepository throw", async () => {
    const { sut, updateCompanyTokenRepositorySpy } = makeSut();
    jest
      .spyOn(updateCompanyTokenRepositorySpy, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
