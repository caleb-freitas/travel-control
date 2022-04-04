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
import {
  mockCompanyAuthenticationParams,
  throwError,
} from "@/tests/domain/mocks";

type Sut = {
  sut: DbDriverAuthentication;
  loadDriverByEmailRepositorySpy: ILoadDriverByEmailRepository;
  hashComparerSpy: IHashComparer;
  encrypterSpy: IEncrypter;
  updateDriverTokenRepositorySpy: IUpdateDriverTokenRepository;
};

function makeSut(): Sut {
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

describe("DbCompanyAuthentication", () => {
  test("should call LoadDriverByEmailRepository with correct email", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadDriverByEmailRepositorySpy, "loadByEmail");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  test("should throw if LoadDriverByEmailRepository throw", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadDriverByEmailRepositorySpy, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if LoadDriverByEmailRepository return null", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadDriverByEmailRepositorySpy, "loadByEmail")
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
    expect(encryptSpy).toHaveBeenCalledWith("driver_id");
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

  test("should call UpdateDriverTokenRepository with correct values", async () => {
    const { sut, updateDriverTokenRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(
      updateDriverTokenRepositorySpy,
      "updateAccessToken"
    );
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith("driver_id", "access_token");
  });

  test("should throw if UpdateDriverTokenRepository throw", async () => {
    const { sut, updateDriverTokenRepositorySpy } = makeSut();
    jest
      .spyOn(updateDriverTokenRepositorySpy, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
