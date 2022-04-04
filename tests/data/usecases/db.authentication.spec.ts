import { DbAuthentication } from "@/data/usecases";
import { Authentication, IAuthentication } from "@/domain/usecases";

function makeDbCompanyAuthentication(): IAuthentication {
  class DbCompanyAuthentication implements IAuthentication {
    result = {
      accessToken: "access_token",
      name: "name",
    };

    async auth(params: Authentication.Params): Promise<Authentication.Result> {
      return new Promise((resolve) => resolve(this.result));
    }
  }
  return new DbCompanyAuthentication();
}

function makeAuthParams() {
  return {
    email: "valid@email.com",
    password: "ValidPass123",
    role: "valid_role",
  };
}

type Sut = {
  sut: IAuthentication;
  dbCompanyAuthenticationStub: IAuthentication;
};

function makeSut(): Sut {
  const dbCompanyAuthenticationStub = makeDbCompanyAuthentication();
  const sut = new DbAuthentication(dbCompanyAuthenticationStub);
  return {
    sut,
    dbCompanyAuthenticationStub,
  };
}

describe("DbAuthentication", () => {
  test("should call DbCompanyAuthentication with correct values", async () => {
    const { sut, dbCompanyAuthenticationStub } = makeSut();
    const authSpy = jest.spyOn(dbCompanyAuthenticationStub, "auth");
    await sut.auth(makeAuthParams());
    expect(authSpy).toHaveBeenCalledWith(makeAuthParams());
  });
});
