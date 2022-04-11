import { IAuthentication } from "@/domain/usecases";
import { LoginController } from "@/presentation/controllers";
import { IValidation } from "@/presentation/protocols";
import { ValidationSpy, DbAuthenticationSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: LoginController;
  validationSpy: IValidation;
  dbAuthenticationSpy: IAuthentication;
};

export function loginSut(): Sut {
  const validationSpy = new ValidationSpy();
  const dbAuthenticationSpy = new DbAuthenticationSpy();
  const sut = new LoginController(validationSpy, dbAuthenticationSpy);
  return {
    sut,
    validationSpy,
    dbAuthenticationSpy,
  };
}
