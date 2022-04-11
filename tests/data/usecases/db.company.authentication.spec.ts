import { companyAuthSut } from "@/tests/data/sut";
import {
  mockCompanyAuthenticationParams,
  throwError,
} from "@/tests/domain/mocks";

describe("DbCompanyAuthentication", () => {
  test("should call LoadCompanyByEmailRepository with correct email", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = companyAuthSut();
    const loadSpy = jest.spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  test("should throw if LoadCompanyByEmailRepository throw", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = companyAuthSut();
    jest
      .spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if LoadCompanyByEmailRepository return null", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = companyAuthSut();
    jest
      .spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail")
      .mockReturnValueOnce(null);
    const response = await sut.auth(mockCompanyAuthenticationParams());
    expect(response).toBeNull();
  });

  test("should call HashComparer with correct password", async () => {
    const { sut, hashComparerSpy } = companyAuthSut();
    const compareSpy = jest.spyOn(hashComparerSpy, "compare");
    await sut.auth(mockCompanyAuthenticationParams());
    expect(compareSpy).toHaveBeenCalledWith(
      "valid_password",
      "hashed_password"
    );
  });

  test("should throw if HashComparer throw", async () => {
    const { sut, hashComparerSpy } = companyAuthSut();
    jest.spyOn(hashComparerSpy, "compare").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if HashComparer return null", async () => {
    const { sut, hashComparerSpy } = companyAuthSut();
    jest
      .spyOn(hashComparerSpy, "compare")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const response = await sut.auth(mockCompanyAuthenticationParams());
    expect(response).toBeNull();
  });

  test("should call Encrypter with correct plaintext", async () => {
    const { sut, encrypterSpy } = companyAuthSut();
    const encryptSpy = jest.spyOn(encrypterSpy, "encrypt");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(encryptSpy).toHaveBeenCalledWith("company_id");
  });

  test("should throw if Encrypter throw", async () => {
    const { sut, encrypterSpy } = companyAuthSut();
    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call UpdateCompanyTokenRepository with correct values", async () => {
    const { sut, updateCompanyTokenRepositorySpy } = companyAuthSut();
    const loadSpy = jest.spyOn(
      updateCompanyTokenRepositorySpy,
      "updateAccessToken"
    );
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith("company_id", "access_token");
  });

  test("should throw if UpdateCompanyTokenRepository throw", async () => {
    const { sut, updateCompanyTokenRepositorySpy } = companyAuthSut();
    jest
      .spyOn(updateCompanyTokenRepositorySpy, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
