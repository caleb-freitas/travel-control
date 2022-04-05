import { DbAuthentication } from "@/data/usecases";
import {
  DbCompanyAuthenticationSpy,
  DbDriverAuthenticationSpy,
} from "@/tests/data/mocks";
import {
  mockCompanyAuthenticationParams,
  mockCompanyAuthenticationResult,
  mockDriverAuthenticationParams,
  mockDriverAuthenticationResult,
  throwError,
} from "@/tests/domain/mocks";

type Sut = {
  sut: DbAuthentication;
  dbCompanyAuthenticationSpy: DbCompanyAuthenticationSpy;
  dbDriverAuthenticationSpy: DbDriverAuthenticationSpy;
};

function makeSut(): Sut {
  const dbCompanyAuthenticationSpy = new DbCompanyAuthenticationSpy();
  const dbDriverAuthenticationSpy = new DbDriverAuthenticationSpy();
  const sut = new DbAuthentication(
    dbCompanyAuthenticationSpy,
    dbDriverAuthenticationSpy
  );
  return {
    sut,
    dbCompanyAuthenticationSpy,
    dbDriverAuthenticationSpy,
  };
}

describe("DbAuthentication", () => {
  test("should call DbCompanyAuthentication with correct values", async () => {
    const { sut, dbCompanyAuthenticationSpy } = makeSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    const authSpy = jest.spyOn(dbCompanyAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });

  test("should throw if DbCompanyAuthentication throw", async () => {
    const { sut, dbCompanyAuthenticationSpy } = makeSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    jest
      .spyOn(dbCompanyAuthenticationSpy, "auth")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow();
  });

  test("should return an access token for the company if DbCompanyAuthentication succeeds", async () => {
    const { sut } = makeSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    const authResponse = await sut.auth(authenticationParams);
    expect(authResponse).toEqual(mockCompanyAuthenticationResult());
  });

  test("should call DbDriverAuthentication with correct values", async () => {
    const { sut, dbDriverAuthenticationSpy } = makeSut();
    const authenticationParams = mockCompanyAuthenticationParams();
    authenticationParams.role = "driver";
    const authSpy = jest.spyOn(dbDriverAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });

  test("should throw if DbDriverAuthentication throw", async () => {
    const { sut, dbDriverAuthenticationSpy } = makeSut();
    const authenticationParams = mockDriverAuthenticationParams();
    jest
      .spyOn(dbDriverAuthenticationSpy, "auth")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow();
  });

  test("should return null if authentication fail", async () => {
    const { sut } = makeSut();
    const response = await sut.auth({
      email: "invalid@email.com",
      password: "password",
      role: "null",
    });
    expect(response).toBeNull();
  });

  test("should return an access token for the company if DbDriverAuthentication succeeds", async () => {
    const { sut } = makeSut();
    const authenticationParams = mockDriverAuthenticationParams();
    const authResponse = await sut.auth(authenticationParams);
    expect(authResponse).toEqual(mockDriverAuthenticationResult());
  });
});
