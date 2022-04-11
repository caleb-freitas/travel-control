import { loadAccountTokenSut } from "@/tests/data/factory";
import { throwError, mockCompanyResult } from "@/tests/domain/mocks";

describe("DbLoadAccountByToken", () => {
  test("should call Decrypter with correct token", async () => {
    const { sut, decrypterSpy } = loadAccountTokenSut();
    const decryptSpy = jest.spyOn(decrypterSpy, "decrypt");
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if Decrypter throw", async () => {
    const { sut, decrypterSpy } = loadAccountTokenSut();
    jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("should return null if no token is returned from Decrypt", async () => {
    const { sut, decrypterSpy } = loadAccountTokenSut();
    jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(null);
    const response = await sut.load("any_token");
    expect(response).toBeNull();
  });

  test("should call LoadAccountByTokenRepository with correct token", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = loadAccountTokenSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositorySpy,
      "loadByToken"
    );
    await sut.load("any_token");
    expect(loadByTokenSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if LoadAccountByTokenRepository throw", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = loadAccountTokenSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("should return null if no account is returned from LoadAccountByTokenRepository", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = loadAccountTokenSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockImplementationOnce(() => null);
    const response = await sut.load("invalid_or_empty_token");
    expect(response).toBeNull();
  });

  test("should return an account on success", async () => {
    const { sut } = loadAccountTokenSut();
    const account = await sut.load("any_token");
    expect(account).toEqual({ role: "company", account: mockCompanyResult() });
  });
});
