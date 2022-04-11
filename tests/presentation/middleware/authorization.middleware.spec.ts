import { AccessDeniedError, ServerError } from "@/presentation/errors";
import { forbidden, ok, serverError } from "@/presentation/helpers";
import { mockCompanyResult, throwError } from "@/tests/domain/mocks";
import { authorizationSut } from "@/tests/presentation/middleware/sut";
import { mockTokenRequest } from "@/tests/presentation/mocks";

describe("AuthorizationMiddleware", () => {
  test("should return 403 if no access token is provided", async () => {
    const { sut } = authorizationSut();
    const request = mockTokenRequest();
    delete request.headers;
    const response = await sut.handle(request);
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should call DbLoadAccountByToken with correct token", async () => {
    const { sut, dbLoadAccountByTokenSpy } = authorizationSut();
    const loadSpy = jest.spyOn(dbLoadAccountByTokenSpy, "load");
    await sut.handle(mockTokenRequest());
    expect(loadSpy).toHaveBeenCalledWith("any_token");
  });

  test("should return 500 if DbLoadAccountByToken throw", async () => {
    const { sut, dbLoadAccountByTokenSpy } = authorizationSut();
    jest
      .spyOn(dbLoadAccountByTokenSpy, "load")
      .mockImplementationOnce(throwError);
    const response = await sut.handle(mockTokenRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 403 if DbLoadAccountByToken does not return an account", async () => {
    const { sut, dbLoadAccountByTokenSpy } = authorizationSut();
    jest.spyOn(dbLoadAccountByTokenSpy, "load").mockImplementationOnce(null);
    const response = await sut.handle(mockTokenRequest());
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 200 if DbLoadAccountByToken return an account", async () => {
    const { sut } = authorizationSut();
    const response = await sut.handle(mockTokenRequest());
    expect(response).toEqual(ok({ company_id: "company_id" }));
  });
});
