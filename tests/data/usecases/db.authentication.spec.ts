import { DbAuthentication } from "@/data/usecases";
import { DbCompanyAuthenticationSpy } from "@/tests/data/mocks";
import {
  mockAuthenticationParams,
  mockAuthenticationResult,
  throwError,
} from "@/tests/domain/mocks";

type Sut = {
  sut: DbAuthentication;
  dbCompanyAuthenticationSpy: DbCompanyAuthenticationSpy;
};

function makeSut(): Sut {
  const dbCompanyAuthenticationSpy = new DbCompanyAuthenticationSpy();
  const sut = new DbAuthentication(dbCompanyAuthenticationSpy);
  return {
    sut,
    dbCompanyAuthenticationSpy,
  };
}

describe("DbAuthentication", () => {
  test("should call DbCompanyAuthentication with correct values", async () => {
    const { sut, dbCompanyAuthenticationSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    const authSpy = jest.spyOn(dbCompanyAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });

  test("should throw if DbCompanyAuthentication throw", async () => {
    const { sut, dbCompanyAuthenticationSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    jest
      .spyOn(dbCompanyAuthenticationSpy, "auth")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow();
  });

  test("should return an access token for the company if DbCompanyAuthentication succeeds", async () => {
    const { sut } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    const authResponse = await sut.auth(authenticationParams);
    expect(authResponse).toEqual(mockAuthenticationResult());
  });

  test("should call DbDriverAuthentication with correct values", async () => {
    const { sut, dbCompanyAuthenticationSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    const authSpy = jest.spyOn(dbCompanyAuthenticationSpy, "auth");
    await sut.auth(authenticationParams);
    expect(authSpy).toHaveBeenCalledWith(authenticationParams);
  });
});
