import { IAuthentication } from "@/domain/usecases";
import { LoginController } from "@/presentation/controllers";
import { IHttpRequest, IValidation } from "@/presentation/protocols";
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
});
