import { DbAuthentication } from "@/data/usecases";
import { IAuthentication } from "@/domain/usecases";
import { DbCompanyAuthenticationSpy } from "@/tests/data/mocks";
import { mockAuthenticationParams } from "@/tests/domain/mocks";

type Sut = {
  sut: IAuthentication;
  dbCompanyAuthenticationSpy: IAuthentication;
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
});
