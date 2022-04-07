import { ILoadAccountByToken } from "@/domain/usecases";
import { ServerError, AccessDeniedError } from "@/presentation/errors";
import { serverError, forbidden, ok } from "@/presentation/helpers";
import { AuthenticationMiddleware } from "@/presentation/middleware";
import { IHttpRequest } from "@/presentation/protocols";
import { throwError } from "@/tests/domain/mocks";
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

  test("should return 500 if DbLoadAccountByToken throw", async () => {
    const { sut, dbLoadAccountByTokenSpy } = makeSut();
    jest
      .spyOn(dbLoadAccountByTokenSpy, "load")
      .mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 403 if DbLoadAccountByToken does not return an account", async () => {
    const { sut, dbLoadAccountByTokenSpy } = makeSut();
    jest.spyOn(dbLoadAccountByTokenSpy, "load").mockImplementationOnce(null);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 403 if no token is provided", async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    delete request.headers;
    const response = await sut.handle(request);
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 200 if DbLoadAccountByToken return an account", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok({ accountId: "company_id" }));
  });
});
