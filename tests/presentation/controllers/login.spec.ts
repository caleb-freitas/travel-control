import { InvalidParamError, ServerError } from "@/presentation/errors";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { loginSut } from "@/tests/presentation/controllers/sut";
import { mockLoginRequest } from "@/tests/presentation/mocks";

describe("LoginController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = loginSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockLoginRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockLoginRequest().body);
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = loginSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockLoginRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should call DbAuthentication with correct values", async () => {
    const { sut, dbAuthenticationSpy } = loginSut();
    const validateSpy = jest.spyOn(dbAuthenticationSpy, "auth");
    await sut.handle(mockLoginRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockLoginRequest().body);
  });

  test("should return 500 if DbAuthentication throw", async () => {
    const { sut, dbAuthenticationSpy } = loginSut();
    jest.spyOn(dbAuthenticationSpy, "auth").mockImplementationOnce(throwError);
    const response = await sut.handle(mockLoginRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 401 if DbAuthentication fail", async () => {
    const { sut, dbAuthenticationSpy } = loginSut();
    jest.spyOn(dbAuthenticationSpy, "auth").mockImplementationOnce(null);
    const response = await sut.handle(mockLoginRequest());
    expect(response).toEqual(unauthorized());
  });

  test("should return 403 if Validation fail", async () => {
    const { sut, validationSpy } = loginSut();
    jest
      .spyOn(validationSpy, "validate")
      .mockReturnValueOnce(new InvalidParamError("field"));
    const response = await sut.handle(mockLoginRequest());
    expect(response).toEqual(badRequest(new InvalidParamError("field")));
  });

  test("should return 200 on success", async () => {
    const { sut } = loginSut();
    const response = await sut.handle(mockLoginRequest());
    expect(response).toEqual(ok({ accessToken: "access_token", name: "name" }));
  });
});
