import { authenticationSut } from "@/tests/data/factory";
import {
  mockCompanyAuthenticationParams,
  mockCompanyAuthenticationResult,
  mockDriverAuthenticationParams,
  mockDriverAuthenticationResult,
  throwError,
} from "@/tests/domain/mocks";

describe("DbAuthentication", () => {
  test("should call DbCompanyAuthentication with correct values", async () => {
    const { sut, dbCompanyAuthenticationSpy } = authenticationSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    const authSpy = jest.spyOn(dbCompanyAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });

  test("should throw if DbCompanyAuthentication throw", async () => {
    const { sut, dbCompanyAuthenticationSpy } = authenticationSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    jest
      .spyOn(dbCompanyAuthenticationSpy, "auth")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow();
  });

  test("should return an access token for the company if DbCompanyAuthentication succeeds", async () => {
    const { sut } = authenticationSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    const authResponse = await sut.auth(authenticationParams);
    expect(authResponse).toEqual(mockCompanyAuthenticationResult());
  });

  test("should call DbDriverAuthentication with correct values", async () => {
    const { sut, dbDriverAuthenticationSpy } = authenticationSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    authenticationParams.role = "driver";
    const authSpy = jest.spyOn(dbDriverAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });

  test("should throw if DbDriverAuthentication throw", async () => {
    const { sut, dbDriverAuthenticationSpy } = authenticationSut();
    const authenticationParams = mockDriverAuthenticationParams();
    jest
      .spyOn(dbDriverAuthenticationSpy, "auth")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow();
  });

  test("should return null if authentication fail", async () => {
    const { sut } = authenticationSut();
    const response = await sut.auth({
      email: "invalid@email.com",
      password: "password",
      role: "invalid_role",
    });
    expect(response).toBeNull();
  });

  test("should return an access token for the company if DbDriverAuthentication succeeds", async () => {
    const { sut } = authenticationSut();
    const authenticationParams = mockDriverAuthenticationParams();
    const authResponse = await sut.auth(authenticationParams);
    expect(authResponse).toEqual(mockDriverAuthenticationResult());
  });
});
