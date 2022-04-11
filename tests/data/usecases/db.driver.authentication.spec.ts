import { driverAuthSut } from "@/tests/data/sut";
import {
  mockCompanyAuthenticationParams,
  throwError,
} from "@/tests/domain/mocks";

describe("DbCompanyAuthentication", () => {
  test("should call LoadDriverByEmailRepository with correct email", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = driverAuthSut();
    const loadSpy = jest.spyOn(loadDriverByEmailRepositorySpy, "loadByEmail");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  test("should throw if LoadDriverByEmailRepository throw", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = driverAuthSut();
    jest
      .spyOn(loadDriverByEmailRepositorySpy, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if LoadDriverByEmailRepository return null", async () => {
    const { sut, loadDriverByEmailRepositorySpy } = driverAuthSut();
    jest
      .spyOn(loadDriverByEmailRepositorySpy, "loadByEmail")
      .mockReturnValueOnce(null);
    const authenticationParams = mockCompanyAuthenticationParams();
    const response = await sut.auth(authenticationParams);
    expect(response).toBe(null);
  });

  test("should call HashComparer with correct password", async () => {
    const { sut, hashComparerSpy } = driverAuthSut();
    const compareSpy = jest.spyOn(hashComparerSpy, "compare");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(compareSpy).toHaveBeenCalledWith(
      "valid_password",
      "hashed_password"
    );
  });

  test("should throw if HashComparer throw", async () => {
    const { sut, hashComparerSpy } = driverAuthSut();
    jest.spyOn(hashComparerSpy, "compare").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if HashComparer return null", async () => {
    const { sut, hashComparerSpy } = driverAuthSut();
    jest
      .spyOn(hashComparerSpy, "compare")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const response = await sut.auth(mockCompanyAuthenticationParams());
    expect(response).toBeNull();
  });

  test("should call Encrypter with correct plaintext", async () => {
    const { sut, encrypterSpy } = driverAuthSut();
    const encryptSpy = jest.spyOn(encrypterSpy, "encrypt");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(encryptSpy).toHaveBeenCalledWith("driver_id");
  });

  test("should throw if Encrypter throw", async () => {
    const { sut, encrypterSpy } = driverAuthSut();
    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return correct data on success", async () => {
    const { sut, encrypterSpy } = driverAuthSut();
    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call UpdateDriverTokenRepository with correct values", async () => {
    const { sut, updateDriverTokenRepositorySpy } = driverAuthSut();
    const loadSpy = jest.spyOn(
      updateDriverTokenRepositorySpy,
      "updateAccessToken"
    );
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith("driver_id", "access_token");
  });

  test("should throw if UpdateDriverTokenRepository throw", async () => {
    const { sut, updateDriverTokenRepositorySpy } = driverAuthSut();
    jest
      .spyOn(updateDriverTokenRepositorySpy, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
