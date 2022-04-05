import { IAuthentication } from "@/domain/usecases";
import { LoginController } from "@/presentation/controllers";
import { ServerError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
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
  test("should call validation with correct values", async () => {
    const { sut, validationSpy } = makeSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body);
  });

  test("should return 500 if validation throw", async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });
});
