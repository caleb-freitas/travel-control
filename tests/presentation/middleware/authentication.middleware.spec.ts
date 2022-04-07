import { ILoadAccountByToken } from "@/domain/usecases";
import { AuthenticationMiddleware } from "@/presentation/middleware";
import { IHttpRequest } from "@/presentation/protocols";
import { DbLoadAccountByTokenSpy } from "@/tests/presentation/mocks";

function mockRequest(): IHttpRequest {
  return {
    headers: {
      "x-access-token": "any_token",
    },
  };
}

type Sut = {
  sut: AuthenticationMiddleware;
  dbLoadAccountByTokenSpy: ILoadAccountByToken;
};

function makeSut(): Sut {
  const dbLoadAccountByTokenSpy = new DbLoadAccountByTokenSpy();
  const sut = new AuthenticationMiddleware(dbLoadAccountByTokenSpy);
  return {
    sut,
    dbLoadAccountByTokenSpy,
  };
}

describe("AuthenticationMiddleware", () => {
  test("should call DbLoadAccountByToken with correct token", async () => {
    const { sut, dbLoadAccountByTokenSpy } = makeSut();
    const loadSpy = jest.spyOn(dbLoadAccountByTokenSpy, "load");
    await sut.handle(mockRequest());
    expect(loadSpy).toHaveBeenCalledWith("any_token");
  });
});
