import { IAuthentication } from "@/domain/usecases";
import { LoginController } from "@/presentation/controllers";
import { ServerError } from "@/presentation/errors";
import { ok, serverError } from "@/presentation/helpers";
import { IHttpRequest, IValidation } from "@/presentation/protocols";
import { throwError } from "@/tests/domain/mocks";
import { ValidationSpy, DbAuthenticationSpy } from "@/tests/presentation/mocks";

function mockRequest(): IHttpRequest {
  return {
    body: {
      email: "valid@email.com",
      password: "valid_pass",
      role: "role",
    },
  };
}

type Sut = {
  sut: LoginController;
  validationSpy: IValidation;
  dbAuthenticationSpy: IAuthentication;
};

function makeSut(): Sut {
  const validationSpy = new ValidationSpy();
  const dbAuthenticationSpy = new DbAuthenticationSpy();
  const sut = new LoginController(validationSpy, dbAuthenticationSpy);
  return {
    sut,
    validationSpy,
    dbAuthenticationSpy,
  };
}

describe("CompanyLoginController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = makeSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body);
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should call DbAuthentication with correct values", async () => {
    const { sut, dbAuthenticationSpy } = makeSut();
    const validateSpy = jest.spyOn(dbAuthenticationSpy, "auth");
    await sut.handle(mockRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body);
  });

  test("should return 500 if DbAuthentication throw", async () => {
    const { sut, dbAuthenticationSpy } = makeSut();
    jest.spyOn(dbAuthenticationSpy, "auth").mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 200 on success", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok({ accessToken: "access_token", name: "name" }));
  });
});
