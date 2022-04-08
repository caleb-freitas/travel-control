import { driverAuthSut } from "@/tests/data/factory";
import { throwError, mockCompanyResult } from "@/tests/domain/mocks";

describe("DbLoadAccountByToken", () => {
  test("should call Decrypter with correct token", async () => {
    const { sut, decrypterSpy } = driverAuthSut();
    const decryptSpy = jest.spyOn(decrypterSpy, "decrypt");
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if Decrypter throw", async () => {
    const { sut, decrypterSpy } = driverAuthSut();
    jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("should call LoadAccountByTokenRepository with correct token", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = driverAuthSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositorySpy,
      "loadByToken"
    );
    await sut.load("any_token");
    expect(loadByTokenSpy).toHaveBeenCalledWith("any_token");
  });

  test("should throw if LoadAccountByTokenRepository throw", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = driverAuthSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("should return an account on success", async () => {
    const { sut } = driverAuthSut();
    const account = await sut.load("any_token");
    expect(account).toEqual(mockCompanyResult());
  });
});
